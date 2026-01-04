import { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import socketService from '../../services/socket';

const Topbar = ({ toggleSidebar }) => {
  const { admin } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Listen for real-time notifications
    socketService.onNewOrder((order) => {
      setNotifications(prev => [{
        id: Date.now(),
        type: 'order',
        message: `New order #${order.orderNumber} received`,
        time: new Date(),
      }, ...prev].slice(0, 5));
    });

    return () => {
      socketService.off('newOrder');
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 transition-colors rounded-lg lg:hidden hover:bg-gray-100"
        >
          <FiMenu className="text-xl text-gray-700" />
        </button>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Welcome back, {admin?.name || 'Admin'}!
          </h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 transition-colors rounded-lg hover:bg-gray-100"
          >
            <FiBell className="text-xl text-gray-700" />
            {notifications.length > 0 && (
              <span className="absolute w-2 h-2 rounded-full top-1 right-1 bg-primary-500"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 z-50 py-2 mt-2 bg-white border border-gray-200 shadow-lg w-80 rounded-xl">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  No new notifications
                </div>
              ) : (
                <div className="overflow-y-auto max-h-96">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 border-b cursor-pointer hover:bg-gray-50 border-gray-50"
                    >
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(notif.time).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100">
            <FiUser className="text-primary-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{admin?.name}</p>
            <p className="text-xs text-gray-500">{admin?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;