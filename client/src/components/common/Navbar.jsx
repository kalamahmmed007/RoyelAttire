import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import SearchBar from "./SearchBar";
import {
    FaBars,
    FaTimes,
    FaHeart,
    FaShoppingCart,
    FaUser,
    FaTag,
    FaFire,
} from "react-icons/fa";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list: categories } = useSelector((state) => state.categories || {});
    const cartCount = useSelector((state) => state.cart.items?.length || 0);
    const wishlistCount = useSelector(
        (state) => state.wishlist.items?.length || 0
    );
    const { user } = useSelector((state) => state.auth || {});

    const [userDropdown, setUserDropdown] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            {/* 🔝 TOP BAR */}
            <div className="container mx-auto flex items-center gap-3 px-4 py-3">
                {/* MOBILE MENU */}
                <button
                    className="md:hidden text-xl"
                    onClick={() => setMobileOpen(true)}
                >
                    <FaBars />
                </button>

                {/* LOGO */}
                <Link to="/" className="text-2xl font-bold">
                    ROYEL
                </Link>

                {/* SEARCH */}
                <div className="hidden md:block flex-1">
                    <SearchBar />
                </div>

                {/* DESKTOP BOX MENU */}
                <div className="hidden md:flex items-center gap-3">
                    <NavLink to="/offers" className="nav-box">
                        <FaTag /> <h2 className="font-bold">Offer</h2>
                    </NavLink>

                    <NavLink to="/latest" className="nav-box">
                        <FaFire /> <h3 className="font-semibold">Latest</h3>
                    </NavLink>

                    <NavLink to="/wishlist" className="nav-box relative">
                        <FaHeart />
                        <span>Wishlist</span>
                        {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
                    </NavLink>

                    <NavLink to="/cart" className="nav-box relative">
                        <FaShoppingCart />
                        <span>Cart</span>
                        {cartCount > 0 && <span className="badge">{cartCount}</span>}
                    </NavLink>

                    {/* ACCOUNT */}
                    <div className="relative">
                        <button
                            onClick={() => setUserDropdown(!userDropdown)}
                            className="nav-box"
                        >
                            <FaUser /> <span>Account</span>
                        </button>

                        {userDropdown && (
                            <div className="absolute right-0 top-12 w-44 rounded border bg-white shadow">
                                {user ? (
                                    <>
                                        <Link className="dropdown-item" to="/profile">
                                            Profile
                                        </Link>
                                        <Link className="dropdown-item" to="/orders">
                                            Orders
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link className="dropdown-item" to="/login">
                                            Login
                                        </Link>
                                        <Link className="dropdown-item" to="/register">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 🔽 CATEGORY BAR (DESKTOP) */}
            <div className="hidden md:block border-t bg-gray-50">
                <div className="container mx-auto flex flex-wrap gap-4 px-4 py-2">
                    {Array.isArray(categories) &&
                        categories.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() =>
                                    navigate(`/products?category=${cat.name}`)
                                }
                                className="rounded px-3 py-1 text-sm hover:bg-black hover:text-white"
                            >
                                {cat.name}
                            </button>
                        ))}
                </div>
            </div>

            {/* 📱 MOBILE DRAWER */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div className="h-full w-72 bg-white p-4">
                        <button
                            className="mb-4 text-xl"
                            onClick={() => setMobileOpen(false)}
                        >
                            <FaTimes />
                        </button>

                        <SearchBar />

                        <div className="mt-4 space-y-2">
                            <Link className="mobile-item" to="/offers">
                                <FaTag /> Offer
                            </Link>
                            <Link className="mobile-item" to="/latest">
                                <FaFire /> Latest
                            </Link>
                            <Link className="mobile-item" to="/wishlist">
                                <FaHeart /> Wishlist ({wishlistCount})
                            </Link>
                            <Link className="mobile-item" to="/cart">
                                <FaShoppingCart /> Cart ({cartCount})
                            </Link>
                        </div>

                        <hr className="my-4" />

                        <div className="space-y-2">
                            {Array.isArray(categories) &&
                                categories.map((cat) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => {
                                            navigate(`/products?category=${cat.name}`);
                                            setMobileOpen(false);
                                        }}
                                        className="block w-full text-left text-sm hover:underline"
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
