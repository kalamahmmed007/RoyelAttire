import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        auth: { token },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket.id);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected:', reason);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Listen for new orders
  onNewOrder(callback) {
    if (this.socket) {
      this.socket.on('newOrder', callback);
    }
  }

  // Listen for order updates
  onOrderUpdate(callback) {
    if (this.socket) {
      this.socket.on('orderUpdate', callback);
    }
  }

  // Listen for new users
  onNewUser(callback) {
    if (this.socket) {
      this.socket.on('newUser', callback);
    }
  }

  // Listen for product updates
  onProductUpdate(callback) {
    if (this.socket) {
      this.socket.on('productUpdate', callback);
    }
  }

  // Listen for stats updates
  onStatsUpdate(callback) {
    if (this.socket) {
      this.socket.on('statsUpdate', callback);
    }
  }

  // Remove listeners
  off(event) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  // Emit events
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export default new SocketService();