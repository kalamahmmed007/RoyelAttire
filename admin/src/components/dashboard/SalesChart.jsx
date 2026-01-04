import { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesData } from '../../redux/slices/statsSlice';

const SalesChart = () => {
  const dispatch = useDispatch();
  const { salesData, isLoading } = useSelector((state) => state.stats);
  const [period, setPeriod] = useState('7days');
  const [chartType, setChartType] = useState('area');

  useEffect(() => {
    dispatch(getSalesData({ period }));
  }, [dispatch, period]);

  const periods = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' },
  ];

  const chartTypes = [
    { value: 'area', label: 'Area' },
    { value: 'line', label: 'Line' },
    { value: 'bar', label: 'Bar' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <p className="mb-1 text-sm font-semibold text-gray-800">
            {payload[0].payload.date}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-primary-600">
              Sales: <span className="font-bold">${payload[0].value.toLocaleString()}</span>
            </p>
            {payload[1] && (
              <p className="text-sm text-success-600">
                Orders: <span className="font-bold">{payload[1].value}</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: salesData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#dc2626" 
              strokeWidth={2}
              dot={{ fill: '#dc2626', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={{ fill: '#22c55e', r: 4 }}
            />
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="sales" fill="#dc2626" radius={[8, 8, 0, 0]} />
            <Bar dataKey="orders" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        );
      
      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#dc2626" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
            <Area 
              type="monotone" 
              dataKey="orders" 
              stroke="#22c55e" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorOrders)" 
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Sales Analytics</h3>
          <p className="mt-1 text-sm text-gray-500">Track your revenue and orders</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Period Selector */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          {/* Chart Type Selector */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {chartTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setChartType(type.value)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200
                  ${chartType === type.value 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="flex items-center justify-center h-80">
          <div className="w-12 h-12 border-4 rounded-full border-primary-200 border-t-primary-500 animate-spin"></div>
        </div>
      ) : salesData.length === 0 ? (
        <div className="flex items-center justify-center text-gray-500 h-80">
          No sales data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          {renderChart()}
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;