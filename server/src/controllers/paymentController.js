import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res, next) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            metadata: { userId: req.user._id.toString() }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        next(error);
    }
};

if (!process.env.STRIPE_SECRET_KEY) {
    throw new error('STRIPE_SECRET_KEY is missing in environment variables');
}

export const webhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        console.log('Payment succeeded:', paymentIntent.id);
    }

    res.json({ received: true });
};