"use client";

import { useState } from 'react';
import axios from 'axios';

interface Student {
  studentId: number;
  studentName: string;
  course: string;
  presentDate: string;
}

const UpdateStudent = ({ token }: { token: string }) => {
  const [student, setStudent] = useState<Student>({
    studentId: 0,
    studentName: '',
    course: '',
    presentDate: ''
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student.studentId || !student.studentName || !student.course || !student.presentDate) {
      setMessage('All fields are required.');
      return;
    }
    try {
      await axios.put(`http://localhost:8088/api/Student/${student.studentId}`, student, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Student updated successfully.');
      setStudent({ studentId: 0, studentName: '', course: '', presentDate: '' });
    } catch (error) {
      setMessage('Error updating student.');
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Update Student</h3>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Student ID:</label>
          <input
            type="number"
            name="studentId"
            value={student.studentId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={student.studentName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course:</label>
          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Present Date:</label>
          <input
            type="text"
            name="presentDate"
            value={student.presentDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;