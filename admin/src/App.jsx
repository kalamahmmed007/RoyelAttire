import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

// Layout Components
import Sidebar from './components/common/Sidebar';
import Topbar from './components/common/Topbar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Orders from './pages/Orders';
import OrderDetails from './components/orders/OrderDetails';
import Users from './pages/Users';
import UserDetails from './components/users/UserDetails';
import Categories from './pages/Categories';
import Settings from './pages/Settings';

// Hooks
import { useSocket } from './hooks';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.auth);
  
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Initialize socket connection
  useSocket();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Products />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/add"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddProduct />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditProduct />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Orders />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrderDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Users />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UserDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Categories />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="text-center">
                <h1 className="mb-4 text-6xl font-bold text-primary-600">404</h1>
                <p className="mb-8 text-xl text-gray-600">Page not found</p>
                <a href="/dashboard" className="btn-primary">
                  Go to Dashboard
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;