import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container mx-auto py-20 text-center">
            <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
            <Link to="/" className="text-blue-600 underline">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
