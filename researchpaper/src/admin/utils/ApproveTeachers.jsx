import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveTeachers = () => {
  const [teachers, setTeachers] = useState([]);

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

  const handleApprove = async (teacher) => {
    try {
      const updatedTeacher = {
        ...teacher,
        isApproved: true
      };

      await axios.put(`http://localhost:8080/teachers/${teacher.id}`, updatedTeacher);
      alert('Teacher approved successfully!');
      fetchTeachers();
    } catch (error) {
      console.error('Error approving teacher:', error);
    }
  };

  const pendingTeachers = teachers.filter(teacher => teacher.isApproved === false);

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Pending Approval Teachers</h4>

      {pendingTeachers.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Expertise</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingTeachers.map((teacher) => (
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
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleApprove(teacher)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">No teachers waiting for approval.</div>
      )}
    </div>
  );
};

export default ApproveTeachers;
