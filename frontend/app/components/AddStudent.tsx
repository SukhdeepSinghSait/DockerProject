"use client";

import { useState } from 'react';
import axios from 'axios';

interface Student {
  studentId: number;
  studentName: string;
  course: string;
  presentDate: string;
}

const AddStudent = ({ token }: { token: string }) => {
  const [students, setStudents] = useState<Student[]>([
    { studentId: 0, studentName: '', course: '', presentDate: '' }
  ]);
  const [message, setMessage] = useState<string>('');

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], [e.target.name]: e.target.value };
    setStudents(newStudents);
  };

  const handleAddStudent = () => {
    setStudents([...students, { studentId: 0, studentName: '', course: '', presentDate: '' }]);
  };

  const handleRemoveStudent = (index: number) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (students.some(student => !student.studentId || !student.studentName || !student.course || !student.presentDate)) {
      setMessage('All fields are required for each student.');
      return;
    }
    try {
      await axios.post('http://localhost:8088/api/Student', students, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Students added successfully.');
      setStudents([{ studentId: 0, studentName: '', course: '', presentDate: '' }]);
    } catch (error) {
      setMessage('Error adding students.');
      console.error('Error adding students:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Add Students</h3>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        {students.map((student, index) => (
          <div key={index} className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700">Student ID:</label>
              <input
                type="number"
                name="studentId"
                value={student.studentId}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Student Name:</label>
              <input
                type="text"
                name="studentName"
                value={student.studentName}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Course:</label>
              <input
                type="text"
                name="course"
                value={student.course}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Present Date:</label>
              <input
                type="text"
                name="presentDate"
                value={student.presentDate}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            {students.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveStudent(index)}
                className="w-full bg-red-500 text-white py-2 rounded-lg mb-4"
              >
                Remove Student
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStudent}
          className="w-full bg-green-500 text-white py-2 rounded-lg mb-4"
        >
          Add Another Student
        </button>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Submit Students
        </button>
      </form>
    </div>
  );
};

export default AddStudent;