import React from 'react';
import AuthProvider from './provider/authProvider';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App