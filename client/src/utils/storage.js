// Local Storage utilities with error handling and encryption support

class Storage {
    constructor(storageType = 'localStorage') {
        this.storage = window[storageType];
    }

    // Set item
    set(key, value, options = {}) {
        try {
            const item = {
                value,
                timestamp: Date.now(),
                ...(options.expiresIn && { expiresAt: Date.now() + options.expiresIn }),
            };

            this.storage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }

    // Get item
    get(key, defaultValue = null) {
        try {
            const itemStr = this.storage.getItem(key);
            if (!itemStr) return defaultValue;

            const item = JSON.parse(itemStr);

            // Check if expired
            if (item.expiresAt && Date.now() > item.expiresAt) {
                this.remove(key);
                return defaultValue;
            }

            return item.value;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    }

    // Remove item
    remove(key) {
        try {
            this.storage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    // Clear all items
    clear() {
        try {
            this.storage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }

    // Check if key exists
    has(key) {
        return this.storage.getItem(key) !== null;
    }

    // Get all keys
    keys() {
        return Object.keys(this.storage);
    }

    // Get storage size in bytes
    size() {
        let total = 0;
        for (const key in this.storage) {
            if (this.storage.hasOwnProperty(key)) {
                total += this.storage[key].length + key.length;
            }
        }
        return total;
    }

    // Get remaining space (approximate)
    remainingSpace() {
        const maxSize = 5 * 1024 * 1024; // 5MB typical limit
        return maxSize - this.size();
    }
}

// Create instances
export const localStorage = new Storage('localStorage');
export const sessionStorage = new Storage('sessionStorage');

// Cookie utilities
export const cookie = {
    set(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },

    get(name) {
        const nameEQ = `${name}=`;
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    },

    remove(name) {
        this.set(name, '', -1);
    },

    has(name) {
        return this.get(name) !== null;
    },
};

// Recently viewed products
export const recentlyViewed = {
    key: 'recentlyViewed',
    maxItems: 10,

    add(product) {
        const items = this.get();
        const filtered = items.filter(item => item._id !== product._id);
        filtered.unshift(product);

        if (filtered.length > this.maxItems) {
            filtered.pop();
        }

        localStorage.set(this.key, filtered);
    },

    get() {
        return localStorage.get(this.key, []);
    },

    remove(productId) {
        const items = this.get();
        const filtered = items.filter(item => item._id !== productId);
        localStorage.set(this.key, filtered);
    },

    clear() {
        localStorage.remove(this.key);
    },
};

// Search history
export const searchHistory = {
    key: 'searchHistory',
    maxItems: 20,

    add(query) {
        if (!query || query.trim() === '') return;

        const items = this.get();
        const filtered = items.filter(item => item !== query);
        filtered.unshift(query);

        if (filtered.length > this.maxItems) {
            filtered.pop();
        }

        localStorage.set(this.key, filtered);
    },

    get() {
        return localStorage.get(this.key, []);
    },

    remove(query) {
        const items = this.get();
        const filtered = items.filter(item => item !== query);
        localStorage.set(this.key, filtered);
    },

    clear() {
        localStorage.remove(this.key);
    },
};

// User preferences
export const preferences = {
    key: 'userPreferences',

    get(key, defaultValue) {
        const prefs = localStorage.get(this.key, {});
        return key ? (prefs[key] ?? defaultValue) : prefs;
    },

    set(key, value) {
        const prefs = this.get();
        prefs[key] = value;
        localStorage.set(this.key, prefs);
    },

    remove(key) {
        const prefs = this.get();
        delete prefs[key];
        localStorage.set(this.key, prefs);
    },

    clear() {
        localStorage.remove(this.key);
    },
};

// Cart persistence
export const cartStorage = {
    key: 'cart',

    get() {
        return localStorage.get(this.key, []);
    },

    set(cart) {
        localStorage.set(this.key, cart);
    },

    add(item) {
        const cart = this.get();
        const existingIndex = cart.findIndex(i => i._id === item._id);

        if (existingIndex > -1) {
            cart[existingIndex] = item;
        } else {
            cart.push(item);
        }

        this.set(cart);
    },

    remove(itemId) {
        const cart = this.get();
        const filtered = cart.filter(item => item._id !== itemId);
        this.set(filtered);
    },

    clear() {
        localStorage.remove(this.key);
    },
};

// Wishlist persistence
export const wishlistStorage = {
    key: 'wishlist',

    get() {
        return localStorage.get(this.key, []);
    },

    set(wishlist) {
        localStorage.set(this.key, wishlist);
    },

    add(product) {
        const wishlist = this.get();
        const exists = wishlist.some(item => item._id === product._id);

        if (!exists) {
            wishlist.push(product);
            this.set(wishlist);
        }
    },

    remove(productId) {
        const wishlist = this.get();
        const filtered = wishlist.filter(item => item._id !== productId);
        this.set(filtered);
    },

    has(productId) {
        const wishlist = this.get();
        return wishlist.some(item => item._id === productId);
    },

    clear() {
        localStorage.remove(this.key);
    },
};

export default {
    localStorage,
    sessionStorage,
    cookie,
    recentlyViewed,
    searchHistory,
    preferences,
    cartStorage,
    wishlistStorage,
};