// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
   <nav className="bg-[#e2ecf8]  backdrop-blur-md shadow-md  py-4 px-6 flex justify-between items-center">
   
   {/* <div className='flex'> */}
      <Link to="/" >
<span className="text-xl font-bold text-blue-700">Resumetrics</span>
</Link>
{/* <sub className='text-xs text-black/90'>  Precision meets potential</sub>
   </div>
   */}

      <div className="space-x-4">
      <Link to="/aboutus" className="text-gray-700 hover:text-blue-600 font-medium">
              About us
            </Link>
        {user ? (
          <>
                   

            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

