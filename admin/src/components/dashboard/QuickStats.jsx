import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/slices/statsSlice';
import { FiDollarSign, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi';
import StatCard from './StatCard';
import socketService from '../../services/socket';
import { updateStats } from '../../redux/slices/statsSlice';

const QuickStats = () => {
  const dispatch = useDispatch();
  const { dashboardStats, isLoading } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  // Real-time stats updates
  useEffect(() => {
    socketService.onStatsUpdate((stats) => {
      dispatch(updateStats(stats));
    });

    return () => {
      socketService.off('statsUpdate');
    };
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Revenue',
      value: dashboardStats.totalRevenue?.toLocaleString() || '0',
      icon: FiDollarSign,
      trend: 'up',
      trendValue: 12.5,
      color: 'primary',
      prefix: '$',
    },
    {
      title: 'Total Orders',
      value: dashboardStats.totalOrders?.toLocaleString() || '0',
      icon: FiShoppingCart,
      trend: 'up',
      trendValue: 8.2,
      color: 'success',
    },
    {
      title: 'Total Users',
      value: dashboardStats.totalUsers?.toLocaleString() || '0',
      icon: FiUsers,
      trend: 'up',
      trendValue: 15.3,
      color: 'info',
    },
    {
      title: 'Total Products',
      value: dashboardStats.totalProducts?.toLocaleString() || '0',
      icon: FiPackage,
      trend: 'up',
      trendValue: 5.1,
      color: 'warning',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default QuickStats;