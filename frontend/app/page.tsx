"use client";
import { useState } from 'react';
import AddStudent from './components/AddStudent';
import GetStudent from './components/GetStudent';
import UpdateStudent from './components/UpdateStudent';
import DeleteStudent from './components/DeleteStudent';
import Login from './components/Login';

const Home = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Docker Project</h1>
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <AddStudent token={token} />
            <GetStudent token={token} />
            <UpdateStudent token={token} />
            <DeleteStudent token={token} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;