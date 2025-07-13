import React, { useState } from 'react';
import axios from 'axios';
export default function LoginForm({ switchView, onLogin }) {
  const [email, setEmail] = useState(''), [pass, setPass] = useState(''), [err, setErr] = useState('');
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password: pass });
      onLogin(res.data.token);
    } catch (e) { setErr(e.response?.data?.msg || 'Login failed'); }
  };
  return (
    <form className="space-y-4 bg-gray-800 p-6 rounded" onSubmit={submit}>
      <h2 className="text-xl font-semibold">Login</h2>
      {err && <div className="text-red-500">{err}</div>}
      <input type="email" placeholder="Email" className="w-full p-2 bg-gray-700 rounded" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2 bg-gray-700 rounded" value={pass} onChange={e=>setPass(e.target.value)} required />
      <button type="submit" className="w-full py-2 bg-blue-600 rounded">Login</button>
      <p className="text-center">
        Don't have an account? <button type="button" className="text-blue-400" onClick={switchView}>Sign Up</button>
      </p>
    </form>
  );
}
