import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socketService from '../services/socket';
import { addNewOrder, updateOrderInList } from '../redux/slices/orderSlice';
import { updateStats } from '../redux/slices/statsSlice';
import toast from 'react-hot-toast';

/**
 * Custom hook for managing Socket.io connection and events
 * Automatically connects/disconnects based on authentication
 */
const useSocket = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!admin?.token) return;

    // Connect to socket server
    socketService.connect(admin.token);

    // Listen for new orders
    socketService.onNewOrder((newOrder) => {
      dispatch(addNewOrder(newOrder));
      toast.success('New order received!', {
        icon: '🛍️',
        duration: 4000,
      });
    });

    // Listen for order updates
    socketService.onOrderUpdate((updatedOrder) => {
      dispatch(updateOrderInList(updatedOrder));
    });

    // Listen for new users
    socketService.onNewUser((newUser) => {
      toast.success(`New user registered: ${newUser.name}`, {
        icon: '👤',
        duration: 3000,
      });
    });

    // Listen for stats updates
    socketService.onStatsUpdate((stats) => {
      dispatch(updateStats(stats));
    });

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, [admin, dispatch]);

  return socketService;
};

export default useSocket;