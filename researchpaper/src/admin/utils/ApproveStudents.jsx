import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproveStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/students/viewAll');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students who are not approved
  const pendingStudents = students.filter(student => !student.isApproved);

  // Handle approve student
  const approveStudent = async (studentId) => {
    try {
      // Find the student data based on ID
      const studentToApprove = students.find(student => student.id === studentId);

      if (studentToApprove) {
        // Create a new student object with updated isApproved field
        const updatedStudent = {
          ...studentToApprove, // Keep all original fields
          isApproved: true, // Set isApproved to true
        };

        // Update the student on the server
        await axios.put(`http://localhost:8080/students/update/${studentId}`, updatedStudent);

        // Update state locally to reflect the approval
        setStudents(prevStudents => 
          prevStudents.map(student => 
            student.id === studentId ? { ...student, isApproved: true } : student
          )
        );
        alert('Student approved successfully!');
      }
    } catch (error) {
      console.error('Error approving student:', error);
      alert('Failed to approve student!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Approve Students</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Year of Study</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {pendingStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.course}</td>
                <td>{student.yearOfStudy}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => approveStudent(student.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveStudents;
