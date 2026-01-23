import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchCart } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/authSlice";
import SearchBar from "./SearchBar";
import { ShoppingCart, Heart, User, Menu, X, ChevronDown, Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMenuRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Redux states
  const { categories = [] } = useSelector((state) => state.category || {});
  const { isAuthenticated } = useSelector((state) => state.auth || {});
  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  // Quantity aware cart count
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCart()); // keep cart badge updated on refresh
  }, [dispatch]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

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

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden max-w-2xl flex-1 md:flex">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button
              className="relative rounded-full p-2 hover:bg-gray-100"
              onClick={() => navigate("/wishlist")}
            >
              <Heart size={24} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="relative rounded-full p-2 hover:bg-gray-100"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={24} className="text-gray-700" />
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                  {isAuthenticated ? (
                    <>
                      <button onClick={() => { navigate("/profile"); setIsUserMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">My Account</button>
                      <button onClick={() => { navigate("/orders"); setIsUserMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">Orders</button>
                      <button onClick={() => { navigate("/settings"); setIsUserMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">Settings</button>
                      <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">Logout</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { navigate("/login"); setIsUserMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">Login</button>
                      <button onClick={() => { navigate("/register"); setIsUserMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">Register</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-4 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-2 top-2 text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ===== CATEGORY BAR ===== */}
      <div className="border-b bg-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="hidden justify-center gap-8 py-3 lg:flex">
            <button onClick={() => navigate("/products")} className="font-medium text-gray-700 hover:text-blue-600">
              All Categories
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category.slug || category.name)}
                className="text-gray-700 hover:text-blue-600"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="space-y-2 py-4 lg:hidden">
              <button onClick={() => { navigate("/products"); setIsMobileMenuOpen(false); }} className="block w-full py-2 text-left font-medium text-gray-700 hover:text-blue-600">
                All Categories
              </button>
              {categories.map((category) => (
                <button key={category._id} onClick={() => handleCategoryClick(category.slug || category.name)} className="block w-full py-2 text-left text-gray-700 hover:text-blue-600">
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
