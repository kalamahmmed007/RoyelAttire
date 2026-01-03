import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res, next) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod,
            totalAmount,
            paymentInfo,
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // 🔍 Verify products & stock
        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.product}`,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`,
                });
            }

            // Reduce stock
            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            shippingAddress,
            paymentMethod,
            paymentInfo: paymentInfo || {},
            totalAmount,
            status: 'pending',
        });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name price images');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // 👀 Only owner or admin can see
        if (
            order.user._id.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders
 * @access  Private
 */
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update order status (Admin)
 * @route   PUT /api/orders/:id/status
 * @access  Admin
 */
export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;

        // ⏱️ Mark delivered time
        if (status === 'delivered') {
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete order (Admin)
 * @route   DELETE /api/orders/:id
 * @access  Admin
 */
export const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Order removed',
        });
    } catch (error) {
        next(error);
    }
};
