import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginUser(formData));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                {/* TITLE */}
                <h2 className="mb-1 text-center text-2xl font-bold">Welcome Back </h2>
                <p className="mb-6 text-center text-sm text-gray-500">
                    Login to continue
                </p>

                {/* ERROR TOAST */}
                {error && (
                    <div className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* EMAIL */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:border-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-lg bg-black py-2 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-70"
                    >
                        {loading ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                {/* SOCIAL LOGIN */}
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm hover:bg-gray-50"
                    >
                        <FaGoogle /> Google
                    </button>
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm hover:bg-gray-50"
                    >
                        <FaFacebook /> Facebook
                    </button>
                </div>

                {/* FOOTER */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="font-medium text-black hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
