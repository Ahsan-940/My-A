import React from 'react';

export default function AvatarUI({ name, role }) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 rounded-full bg-blue-500 mx-auto flex items-center justify-center text-4xl uppercase">
        {name[0]}
      </div>
      <p className="mt-4 text-lg">{`Hey ${name}, you are logged in as ${role}`}</p>
      <div className="mt-4 p-2 bg-gray-700 rounded">Chat interface coming soon…</div>
    </div>
  );
}
