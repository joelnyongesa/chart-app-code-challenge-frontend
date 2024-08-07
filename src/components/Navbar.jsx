import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

function Navbar() {
  const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      setToken(null);
      navigate('/login', { replace: true });
  };

  return (
    <nav className='w-full bg-black text-white py-2'>
        <ul className='flex justify-center'>
            <li className='mx-4 hover:text-gray-400 hover:cursor-pointer' onClick={() => navigate('/products')}>Products</li>
            <li className='mx-4 hover:text-gray-400 hover:cursor-pointer' onClick={() =>navigate("/charts")}>Display Charts</li>
            <li className='mx-4 hover:text-gray-400 hover:cursor-pointer' onClick={handleLogout}>Log out</li>
        </ul>
    </nav>
  )
}

export default Navbar