import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [key, setKey] = useState(localStorage.getItem('token'));
  const [view, setView] = useState(key ? 'dashboard' : 'login');

  useEffect(() => {
    axios.get('/api/auth/me', { headers: { Authorization: 'Bearer ' + key } })
      .catch(() => { setView('login'); });
  }, [key]);

  function onLogin(token) {
    localStorage.setItem('token', token);
    setKey(token);
    setView('dashboard');
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      {view === 'login' && <LoginForm switchView={() => setView('signup')} onLogin={onLogin}/>}
      {view === 'signup' && <SignupForm switchView={() => setView('login')} />}
      {view === 'dashboard' && <Dashboard token={key} />}
    </div>
  );
}

export default App;
