import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (email) {
      fetchStudentByEmail();
    }
  }, [email]);

  const fetchStudentByEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/students/email/${email}`);
      setStudent(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/students/update/${student.id}`, formData);
      alert('Profile updated successfully!');
      setEditing(false);
      fetchStudentByEmail(); // Refresh the profile
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!student) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <div className="text-center">
          <img 
            src={formData.photoURL || "https://via.placeholder.com/150"} 
            alt="Student" 
            className="rounded-circle mb-3" 
            style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
          />
          <h3 className="mb-0">{student.name}</h3>
          <small className="text-muted">{student.email}</small>
        </div>

        <hr />

        {editing ? (
          <form onSubmit={handleUpdate}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  value={formData.name || ''} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="phone" 
                  value={formData.phone || ''} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Course</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="course" 
                  value={formData.course || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Year of Study</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="yearOfStudy" 
                  value={formData.yearOfStudy || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Profile Photo URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="photoURL" 
                  value={formData.photoURL || ''} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Save Changes</button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Year of Study:</strong> {student.yearOfStudy}</p>
            <p><strong>Approved:</strong> {student.isApproved ? 'Yes' : 'No'}</p>
            <p><strong>Account Created:</strong> {new Date(student.createdAt).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(student.updatedAt).toLocaleDateString()}</p>

            <div className="text-center">
              <button 
                className="btn btn-primary" 
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
