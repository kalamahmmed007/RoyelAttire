import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="mb-4 text-2xl font-bold">Profile</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default Profile;
