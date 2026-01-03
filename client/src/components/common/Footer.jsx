import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-10 bg-gray-800 py-6 text-white">
            <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
                <p className="text-sm">&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>

                <div className="mt-3 flex space-x-4 md:mt-0">
                    <Link to="/" className="text-sm hover:text-gray-400">
                        Home
                    </Link>
                    <Link to="/products" className="text-sm hover:text-gray-400">
                        Products
                    </Link>
                    <Link to="/cart" className="text-sm hover:text-gray-400">
                        Cart
                    </Link>
                    <Link to="/profile" className="text-sm hover:text-gray-400">
                        Profile
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
