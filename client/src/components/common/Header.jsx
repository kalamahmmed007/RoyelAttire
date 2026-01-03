import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="text-2xl font-bold">
                    Royel Attire
                </Link>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
