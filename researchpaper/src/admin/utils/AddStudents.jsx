import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    passwordHash: '',
    photoURL: '',
    course: '',
    yearOfStudy: '',
    isApproved: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/students/add', studentData);
      alert('🎉 Student added successfully!');
      setStudentData({
        name: '',
        email: '',
        phone: '',
        passwordHash: '',
        photoURL: '',
        course: '',
        yearOfStudy: '',
        isApproved: false,
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('❌ Failed to add student.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="shadow p-4 mb-5 bg-white rounded">
        <h2 className="text-center mb-4">➕ Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={studentData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={studentData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={studentData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="passwordHash"
                value={studentData.passwordHash}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Photo URL (optional)"
              name="photoURL"
              value={studentData.photoURL}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Course"
                name="course"
                value={studentData.course}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Year of Study"
                name="yearOfStudy"
                value={studentData.yearOfStudy}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="isApproved"
              checked={studentData.isApproved}
              onChange={(e) =>
                setStudentData({ ...studentData, isApproved: e.target.checked })
              }
            />
            <label className="form-check-label">Approve Now?</label>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
