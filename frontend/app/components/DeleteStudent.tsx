"use client";

import { useState } from 'react';
import axios from 'axios';

const DeleteStudent = ({ token }: { token: string }) => {
  const [studentId, setStudentId] = useState<number | string>('');
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) {
      setMessage('Student ID is required.');
      return;
    }
    try {
      await axios.delete(`http://localhost:8088/api/Student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Student deleted successfully.');
      setStudentId('');
    } catch (error) {
      setMessage('Error deleting student.');
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Delete Student</h3>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Student ID:</label>
          <input
            type="number"
            value={studentId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg">
          Delete Student
        </button>
      </form>
    </div>
  );
};

export default DeleteStudent;