import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    yearOfStudy: '',
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/students/viewAll');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:8080/students/delete/${id}`);
        alert('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student.');
      }
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
      yearOfStudy: student.yearOfStudy,
    });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/students/update/${editingStudent.id}`, {
        ...editingStudent,
        ...formData,
      });
      alert('Student updated successfully!');
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mt-5">
      <div className="shadow p-4 mb-5 bg-white rounded">
        <h2 className="text-center mb-4">🎓 All Students</h2>

        {editingStudent && (
          <div className="mb-4">
            <h4>Edit Student</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="course"
                    className="form-control"
                    placeholder="Course"
                    value={formData.course}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="yearOfStudy"
                    className="form-control"
                    placeholder="Year of Study"
                    value={formData.yearOfStudy}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success me-2">
                ✅ Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingStudent(null)}
              >
                ❌ Cancel
              </button>
            </form>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Year</th>
                <th>Approved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.course}</td>
                    <td>{student.yearOfStudy}</td>
                    <td>
                      {student.isApproved ? (
                        <span className="badge bg-success">Approved</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pending</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEditClick(student)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteStudent(student.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;
