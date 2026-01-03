// Analytics tracking utilities

class Analytics {
    constructor() {
        this.enabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true';
        this.debug = import.meta.env.MODE === 'development';
    }

    // Track page view
    trackPageView(path, title) {
        if (!this.enabled) return;

        if (this.debug) {
            console.log('Analytics: Page View', { path, title });
        }

        // Google Analytics
        if (window.gtag) {
            window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
                page_path: path,
                page_title: title,
            });
        }

        // Facebook Pixel
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }
    }

    // Track event
    trackEvent(category, action, label, value) {
        if (!this.enabled) return;

        if (this.debug) {
            console.log('Analytics: Event', { category, action, label, value });
        }

        // Google Analytics
        if (window.gtag) {
            window.gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }

        // Facebook Pixel
        if (window.fbq) {
            window.fbq('trackCustom', action, {
                category,
                label,
                value,
            });
        }
    }

    // Track product view
    trackProductView(product) {
        this.trackEvent('Product', 'View', product.name, product.price);

        // Enhanced ecommerce
        if (window.gtag) {
            window.gtag('event', 'view_item', {
                items: [
                    {
                        id: product._id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                    },
                ],
            });
        }

        if (window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: product.name,
                content_ids: [product._id],
                content_type: 'product',
                value: product.price,
                currency: 'USD',
            });
        }
    }

    // Track add to cart
    trackAddToCart(product, quantity = 1) {
        this.trackEvent('Cart', 'Add', product.name, product.price * quantity);

        if (window.gtag) {
            window.gtag('event', 'add_to_cart', {
                items: [
                    {
                        id: product._id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity,
                    },
                ],
            });
        }

        if (window.fbq) {
            window.fbq('track', 'AddToCart', {
                content_name: product.name,
                content_ids: [product._id],
                content_type: 'product',
                value: product.price * quantity,
                currency: 'USD',
            });
        }
    }

    // Track remove from cart
    trackRemoveFromCart(product, quantity = 1) {
        this.trackEvent('Cart', 'Remove', product.name, product.price * quantity);

        if (window.gtag) {
            window.gtag('event', 'remove_from_cart', {
                items: [
                    {
                        id: product._id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity,
                    },
                ],
            });
        }
    }

    // Track begin checkout
    trackBeginCheckout(cart, totalAmount) {
        this.trackEvent('Checkout', 'Begin', '', totalAmount);

        if (window.gtag) {
            window.gtag('event', 'begin_checkout', {
                items: cart.items.map((item) => ({
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                value: totalAmount,
                currency: 'USD',
            });
        }

        if (window.fbq) {
            window.fbq('track', 'InitiateCheckout', {
                value: totalAmount,
                currency: 'USD',
                num_items: cart.items.length,
            });
        }
    }

    // Track purchase
    trackPurchase(order) {
        this.trackEvent('Purchase', 'Complete', order._id, order.totalAmount);

        if (window.gtag) {
            window.gtag('event', 'purchase', {
                transaction_id: order._id,
                value: order.totalAmount,
                currency: 'USD',
                shipping: order.shippingCost,
                tax: order.tax,
                items: order.items.map((item) => ({
                    id: item.product._id,
                    name: item.product.name,
                    category: item.product.category,
                    price: item.price,
                    quantity: item.quantity,
                })),
            });
        }

        if (window.fbq) {
            window.fbq('track', 'Purchase', {
                value: order.totalAmount,
                currency: 'USD',
                content_ids: order.items.map((item) => item.product._id),
                content_type: 'product',
                num_items: order.items.length,
            });
        }
    }

    // Track search
    trackSearch(query, resultsCount) {
        this.trackEvent('Search', 'Query', query, resultsCount);

        if (window.gtag) {
            window.gtag('event', 'search', {
                search_term: query,
                results_count: resultsCount,
            });
        }

        if (window.fbq) {
            window.fbq('track', 'Search', {
                search_string: query,
                content_category: 'Products',
            });
        }
    }

    // Track registration
    trackRegistration(method = 'email') {
        this.trackEvent('User', 'Register', method);

        if (window.gtag) {
            window.gtag('event', 'sign_up', {
                method,
            });
        }

        if (window.fbq) {
            window.fbq('track', 'CompleteRegistration', {
                status: 'completed',
            });
        }
    }

    // Track login
    trackLogin(method = 'email') {
        this.trackEvent('User', 'Login', method);

        if (window.gtag) {
            window.gtag('event', 'login', {
                method,
            });
        }
    }

    // Track wishlist add
    trackAddToWishlist(product) {
        this.trackEvent('Wishlist', 'Add', product.name, product.price);

        if (window.fbq) {
            window.fbq('track', 'AddToWishlist', {
                content_name: product.name,
                content_ids: [product._id],
                content_type: 'product',
                value: product.price,
                currency: 'USD',
            });
        }
    }

    // Track share
    trackShare(method, contentType, itemId) {
        this.trackEvent('Social', 'Share', method);

        if (window.gtag) {
            window.gtag('event', 'share', {
                method,
                content_type: contentType,
                item_id: itemId,
            });
        }
    }

    // Track error
    trackError(error, fatal = false) {
        if (this.debug) {
            console.error('Analytics: Error', error);
        }

        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: error.message || error,
                fatal,
            });
        }
    }

    // Set user properties
    setUser(userId, properties = {}) {
        if (!this.enabled) return;

        if (window.gtag) {
            window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
                user_id: userId,
                user_properties: properties,
            });
        }
    }

    // Clear user
    clearUser() {
        if (!this.enabled) return;

        if (window.gtag) {
            window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
                user_id: null,
            });
        }
    }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics;

// Export individual methods for convenience
export const {
    trackPageView,
    trackEvent,
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart,
    trackBeginCheckout,
    trackPurchase,
    trackSearch,
    trackRegistration,
    trackLogin,
    trackAddToWishlist,
    trackShare,
    trackError,
    setUser,
    clearUser,
} = analytics;