import React, { useState } from 'react';
import axios from 'axios';

const AddTeachers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passwordHash: '',
    photoURL: '',
    qualification: '',
    expertise: ''
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/teachers', {
        ...formData,
        isApproved: false, // default
      });
      alert('Teacher added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        passwordHash: '',
        photoURL: '',
        qualification: '',
        expertise: ''
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
      alert('Failed to add teacher!');
    }
  };

  return (
    <div className="container">
      <h4 className="mb-4 text-center">Add New Teacher</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="passwordHash" value={formData.passwordHash} onChange={handleChange} required />
        </div>

        <div className="col-12">
          <label className="form-label">Photo URL</label>
          <input type="text" className="form-control" name="photoURL" value={formData.photoURL} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Qualification</label>
          <input type="text" className="form-control" name="qualification" value={formData.qualification} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Expertise</label>
          <input type="text" className="form-control" name="expertise" value={formData.expertise} onChange={handleChange} />
        </div>

        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary w-50">Add Teacher</button>
        </div>

      </form>
    </div>
  );
};

export default AddTeachers;
