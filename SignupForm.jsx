import React, { useState } from 'react';
import axios from 'axios';
export default function SignupForm({ switchView }) {
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [pass, setPass] = useState(''), [role, setRole] = useState('Student'), [msg, setMsg] = useState('');
  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password: pass, role });
      setMsg('Registered! Please check email to verify.');
    } catch (e) {
      setMsg(e.response?.data?.msg || 'Sign up error');
    }
  };
  return (
    <form className="space-y-4 bg-gray-800 p-6 rounded" onSubmit={submit}>
      <h2 className="text-xl font-semibold">Sign Up</h2>
      {msg && <div className="text-green-300">{msg}</div>}
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 bg-gray-700 rounded" required />
      <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 bg-gray-700 rounded" required />
      <input placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full p-2 bg-gray-700 rounded" required />
      <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 bg-gray-700 rounded">
        <option>Student</option>
        <option>Teacher</option>
        <option>Child</option>
      </select>
      <button type="submit" className="w-full py-2 bg-green-600 rounded">Sign Up</button>
      <p className="text-center">
        Have an account? <button type="button" className="text-blue-400" onClick={switchView}>Login</button>
      </p>
    </form>
  );
}
