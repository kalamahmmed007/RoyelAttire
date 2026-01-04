import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import clsx from 'clsx';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'primary',
  prefix = '',
  suffix = ''
}) => {
  const isPositive = trend === 'up';
  
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-yellow-100 text-yellow-600',
    info: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="transition-shadow duration-200 stat-card group hover:shadow-md">
      <div className="flex-1">
        <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
        <h3 className="mb-3 text-3xl font-bold text-gray-900">
          {prefix}{value}{suffix}
        </h3>
        
        {/* Trend */}
        {trendValue && (
          <div className="flex items-center gap-2">
            <div className={clsx(
              'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
              isPositive ? 'bg-success-100 text-success-700' : 'bg-primary-100 text-primary-700'
            )}>
              {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>{trendValue}%</span>
            </div>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </div>

      {/* Icon */}
      <div className={clsx(
        'stat-icon group-hover:scale-110 transition-transform duration-200',
        colorClasses[color]
      )}>
        <Icon />
      </div>
    </div>
  );
};

export default StatCard;