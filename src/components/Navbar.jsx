import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Left side nav */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${
                isActive("/") ? "text-white" : "hover:text-purple-300"
              }`}
            >
              <span className="font-semibold">Home</span>
            </Link>
          </div>

          {/* Right side nav */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-sm">
                  Welcome, {user.username}
                  {user.isAdmin && " (Admin)"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm border border-white px-2 py-1 rounded hover:bg-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center space-x-2 ${
                    isActive("/login") ? "text-white" : "hover:text-purple-300"
                  }`}
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center space-x-2 ${
                    isActive("/register") ? "text-white" : "hover:text-purple-300"
                  }`}
                >
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

