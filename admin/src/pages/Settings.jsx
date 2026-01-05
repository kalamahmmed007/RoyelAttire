import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiUser, FiLock, FiBell, FiGlobe, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = () => {
  const { admin } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    userNotifications: false,
    productNotifications: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'password', label: 'Password', icon: FiLock },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'general', label: 'General', icon: FiGlobe },
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    toast.success('Password updated successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleNotificationSave = () => {
    toast.success('Notification settings saved');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-600">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-1 card">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 text-left
                    ${activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="text-lg" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="card">
              <h3 className="mb-6 text-lg font-bold text-gray-900">Profile Information</h3>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="input-field"
                  />
                </div>

                <button type="submit" className="flex items-center gap-2 btn-primary">
                  <FiSave />
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Password Settings */}
          {activeTab === 'password' && (
            <div className="card">
              <h3 className="mb-6 text-lg font-bold text-gray-900">Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="input-field"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <button type="submit" className="flex items-center gap-2 btn-primary">
                  <FiSave />
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="card">
              <h3 className="mb-6 text-lg font-bold text-gray-900">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Receive notifications for {key.replace('Notifications', '').toLowerCase()}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          [key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                    peer-focus:ring-primary-300 rounded-full peer 
                                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                                    after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600">
                      </div>
                    </label>
                  </div>
                ))}

                <button onClick={handleNotificationSave} className="flex items-center gap-2 btn-primary">
                  <FiSave />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="card">
              <h3 className="mb-6 text-lg font-bold text-gray-900">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select className="input-field">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select className="input-field">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-6 (Central Time)</option>
                    <option>UTC-7 (Mountain Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select className="input-field">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <button className="flex items-center gap-2 btn-primary">
                  <FiSave />
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;