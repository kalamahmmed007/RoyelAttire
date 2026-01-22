import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { logout } from "../../redux/slices/authSlice";
import SearchBar from "./SearchBar";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  // Redux states
  const { categories = [] } = useSelector((state) => state.category || {});
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const cartCount = useSelector((state) => state.cart.items.length || 0);
  const wishlistCount = useSelector((state) => state.wishlist.items.length || 0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-md">
      {/* ===== TOP BAR ===== */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          {/* Logo + Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              className="rounded p-2 hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div
              className="cursor-pointer text-2xl font-bold text-blue-600"
              onClick={() => navigate("/")}
            >
              ShopLogo
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden max-w-2xl flex-1 md:flex">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button
              className="relative rounded-full p-2 transition hover:bg-gray-100"
              onClick={() => navigate("/wishlist")}
            >
              <Heart size={24} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="relative rounded-full p-2 transition hover:bg-gray-100"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={24} className="text-gray-700" />
                <ChevronDown size={16} className="hidden text-gray-700 sm:block" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => navigate("/profile")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        My Account
                      </button>
                      <button
                        onClick={() => navigate("/orders")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => navigate("/settings")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => navigate("/register")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-4 px-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute right-2 top-2 text-blue-600">
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* ===== CATEGORY BAR ===== */}
      <div className="border-b bg-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          {/* Desktop */}
          <div className="hidden items-center justify-center gap-8 py-3 lg:flex">
            <button
              onClick={() => navigate("/products")}
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id || category._id}
                onClick={() => handleCategoryClick(category.slug || category.name)}
                className="text-gray-700 transition hover:text-blue-600"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Mobile */}
          {isMobileMenuOpen && (
            <div className="space-y-2 py-4 lg:hidden">
              <button
                onClick={() => navigate("/products")}
                className="block py-2 font-medium text-gray-700 hover:text-blue-600"
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id || category._id}
                  onClick={() => handleCategoryClick(category.slug || category.name)}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
