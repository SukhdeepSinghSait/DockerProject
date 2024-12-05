"use client";

import { useState } from 'react';
import axios from 'axios';

interface Student {
  studentId: number;
  studentName: string;
  course: string;
  presentDate: string;
}

const GetStudent = ({ token }: { token: string }) => {
  const [studentId, setStudentId] = useState<number | string>('');
  const [student, setStudent] = useState<Student | null>(null);
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
      const response = await axios.get(`http://localhost:8088/api/Student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStudent(response.data.data);
      setMessage('Student fetched successfully.');
      setStudentId('');
    } catch (error) {
      setMessage('Error fetching student.');
      console.error('Error fetching student:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Get Student</h3>
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Get Student
        </button>
      </form>
      {student && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Student Details</h3>
          <p>ID: {student.studentId}</p>
          <p>Name: {student.studentName}</p>
          <p>Course: {student.course}</p>
          <p>Present Date: {student.presentDate}</p>
        </div>
      )}
    </div>
  );
};

export default GetStudent;