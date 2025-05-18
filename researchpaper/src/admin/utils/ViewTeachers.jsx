import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    expertise: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    try {
      await axios.delete(`http://localhost:8080/teachers/delete/${id}`);
      alert('Teacher deleted successfully');
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleEditClick = (teacher) => {
    setEditTeacherId(teacher.id);
    setEditFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      qualification: teacher.qualification,
      expertise: teacher.expertise
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/teachers/${editTeacherId}`, editFormData);
      alert('Teacher updated successfully');
      setEditTeacherId(null);
      fetchTeachers();
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Teachers List</h4>

      {editTeacherId ? (
        <form onSubmit={handleEditSubmit} className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={editFormData.name} onChange={handleEditChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={editFormData.email} onChange={handleEditChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" name="phone" value={editFormData.phone} onChange={handleEditChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Qualification</label>
            <input type="text" className="form-control" name="qualification" value={editFormData.qualification} onChange={handleEditChange} />
          </div>

          <div className="col-12">
            <label className="form-label">Expertise</label>
            <input type="text" className="form-control" name="expertise" value={editFormData.expertise} onChange={handleEditChange} />
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success me-2">Save Changes</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditTeacherId(null)}>Cancel</button>
          </div>
        </form>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Expertise</th>
              <th>Photo</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.qualification}</td>
                <td>{teacher.expertise}</td>
                <td>
                  {teacher.photoURL ? (
                    <img src={teacher.photoURL} alt="teacher" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{teacher.isApproved ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(teacher)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(teacher.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTeachers;
