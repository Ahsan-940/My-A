import React, { useState, useEffect } from 'react';
import AvatarUI from './AvatarUI';
import axios from 'axios';
export default function Dashboard({ token }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('/api/auth/me', { headers: { Authorization: 'Bearer ' + token } })
      .then(res => setUser(res.data))
      .catch(console.error);
  }, 
  );
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return user ? (
    <div className="space-y-4">
      <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
      <AvatarUI name={user.name} role={user.role} />
    </div>
  ) : <div>Loading...</div>;
}
