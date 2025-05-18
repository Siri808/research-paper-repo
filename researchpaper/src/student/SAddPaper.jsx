import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddResearchPaper = () => {
  const [formData, setFormData] = useState({
    role: '',
    roleId: null,
    paperName: '',
    category: '',
    branch: '',
    topic: '',
    paperUrl: '',
    paperDescription: '',
    visibility: 'PUBLIC',
  });

  const branches = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];
  const topics = ['AI', 'ML', 'Cybersecurity', 'Data Science', 'IoT', 'Blockchain'];
  const categories = ['Journal', 'Conference', 'Workshop', 'Thesis', 'Case Study'];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');

    if (!role || !email) {
      alert('User not logged in properly.');
      return;
    }

    setFormData((prev) => ({ ...prev, role }));

    if (role === 'student') {
      axios
        .get(`http://localhost:8080/students/getidbyemail/${email}`)
        .then((res) => {
          setFormData((prev) => ({
            ...prev,
            roleId: res.data,
          }));
          console.log('Student ID:', res.data);
        })
        .catch((err) => {
          console.error('Error fetching teacher:', err);
          alert('Error loading teacher data.');
        })
        .finally(() => setLoading(false));
    } else {
      // Add logic for student if needed
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/research-papers', formData);
      alert('Research paper added successfully!');
      setFormData({
        role: formData.role,
        roleId: formData.roleId,
        paperName: '',
        category: '',
        branch: '',
        topic: '',
        paperUrl: '',
        paperDescription: '',
        visibility: 'PUBLIC',
      });
    } catch (error) {
      console.error('Error adding paper:', error);
      alert('Failed to add research paper.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="card p-4 shadow">
        <h3 className="mb-3">Add Research Paper</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Paper Name</label>
            <input
              type="text"
              name="paperName"
              value={formData.paperName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Branch</label>
            <select
              className="form-select"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Topic</label>
            <select
              className="form-select"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            >
              <option value="">Select Topic</option>
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Paper URL</label>
            <input
              type="text"
              name="paperUrl"
              value={formData.paperUrl}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Paper Description</label>
            <textarea
              name="paperDescription"
              value={formData.paperDescription}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Visibility</label>
            <select
              className="form-select"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              required
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit Paper</button>
        </form>
      </div>
    </div>
  );
};

export default AddResearchPaper;
