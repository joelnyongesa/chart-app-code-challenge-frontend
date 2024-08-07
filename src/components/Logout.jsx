import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

function Logout() {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken();
        navigate('/login', { replace: true });
    };

    setTimeout(() => {
        handleLogout();
    }, 3*1000);
  return (
    <div>Logout Page</div>
  )
}

export default Logout