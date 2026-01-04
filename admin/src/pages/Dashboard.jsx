import QuickStats from '../components/dashboard/QuickStats';
import SalesChart from '../components/dashboard/SalesChart';
import RecentOrders from '../components/dashboard/RecentOrders';
import TopProducts from '../components/dashboard/TopProducts';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Sales Chart */}
      <SalesChart />

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
};

export default Dashboard;