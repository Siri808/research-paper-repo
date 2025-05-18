import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import 'animate.css';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (email) fetchTeacherByEmail();
  }, [email]);

  const fetchTeacherByEmail = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/teachers/email/${email}`);
      setTeacher(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/teachers/${teacher.id}`, formData);
      alert('Profile updated!');
      setEditing(false);
      fetchTeacherByEmail();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile.');
    }
  };

  if (!teacher) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-4 animate__animated animate__fadeIn">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div
          className="p-4 text-white"
          style={{
            // background: 'linear-gradient(to right, #141e30, #243b55)',
            borderBottom: '3px solid #00c6ff',
          }}
        >
          <div className="text-center">
            <img
              src={formData.photoURL || 'https://via.placeholder.com/150'}
              alt="Teacher"
              className="rounded-circle shadow mb-3 animate__animated animate__zoomIn"
              style={{
                width: '130px',
                height: '130px',
                objectFit: 'cover',
                border: '1px solid #00c6ff',
              }}
            />
            <h3 className="mb-0 text-dark">{teacher.name}</h3>
            <p className="text-dark mb-0">{teacher.email}</p>
          </div>
        </div>

        <div className="card-body p-4 bg-light">
          {editing ? (
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Qualification</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expertise</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Profile Photo URL</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-success shadow">✅ Save</button>
                <button type="button" className="btn btn-secondary shadow" onClick={() => setEditing(false)}>
                  ❌ Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="px-2 animate__animated animate__fadeIn">
              <p><strong>📞 Phone:</strong> {teacher.phone}</p>
              <p><strong>🎓 Qualification:</strong> {teacher.qualification}</p>
              <p><strong>📘 Expertise:</strong> {teacher.expertise}</p>
              <p><strong>📅 Account Created:</strong> {new Date(teacher.createdAt).toLocaleDateString()}</p>
              {/* <p><strong>🕒 Last Updated:</strong> {new Date(teacher.updatedAt).toLocaleDateString()}</p> */}
              <div className="text-center mt-4">
                <button className="btn btn-primary px-4 shadow" onClick={() => setEditing(true)}>
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
