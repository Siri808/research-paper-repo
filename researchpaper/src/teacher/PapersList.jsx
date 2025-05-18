import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageTeacherPapers = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [teacherId, setTeacherId] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterVisibility, setFilterVisibility] = useState('ALL');
  const [filterBranch, setFilterBranch] = useState('ALL');

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherRes = await axios.get(`http://localhost:8080/teachers/getidbyemail/${userEmail}`);
        const id = teacherRes.data;
        setTeacherId(id);

        const papersRes = await axios.get(`http://localhost:8080/research-papers/teacher/${id}`);
        setPapers(papersRes.data);
        setFilteredPapers(papersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const applyFilters = () => {
    const filtered = papers.filter(paper => {
      const matchVisibility = filterVisibility === 'ALL' || paper.visibility === filterVisibility;
      const matchBranch = filterBranch === 'ALL' || paper.branch === filterBranch;
      return matchVisibility && matchBranch;
    });
    setFilteredPapers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterVisibility, filterBranch, papers]);

  const handleInputChange = (index, field, value) => {
    const updated = [...filteredPapers];
    updated[index][field] = value;
    setFilteredPapers(updated);
  };

  const handleUpdate = async (paper, index) => {
    try {
      const updatedPaper = {
        ...paper,
        role: 'teacher',
        roleId: teacherId,
        visibility: paper.visibility
      };
      await axios.put(`http://localhost:8080/research-papers/${paper.paperId}`, updatedPaper);
      alert('Paper updated successfully');
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating paper:', error);
      alert('Failed to update paper.');
    }
  };

  const handleDelete = async (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      try {
        await axios.delete(`http://localhost:8080/research-papers/${paperId}`);
        const updated = papers.filter(p => p.paperId !== paperId);
        setPapers(updated);
      } catch (error) {
        console.error('Error deleting paper:', error);
        alert('Failed to delete paper.');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Manage Your Research Papers</h2>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <select className="form-select" value={filterVisibility} onChange={e => setFilterVisibility(e.target.value)}>
            <option value="ALL">All Visibility</option>
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterBranch} onChange={e => setFilterBranch(e.target.value)}>
            <option value="ALL">All Branches</option>
            {[...new Set(papers.map(p => p.branch))].map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="alert alert-warning">No research papers found.</div>
      ) : (
        filteredPapers.map((paper, index) => (
          <div key={paper.paperId} className="card shadow-sm mb-4 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{paper.paperName}</h5>
                <span className={`badge bg-${paper.visibility === 'PUBLIC' ? 'success' : 'secondary'}`}>
                  {paper.visibility}
                </span>
              </div>
              <p className="mb-1"><strong>Branch:</strong> {paper.branch}</p>
              <p className="mb-1"><strong>Category:</strong> {paper.category}</p>
              <p className="mb-1"><strong>Topic:</strong> {paper.topic}</p>
              <p className="mb-1"><strong>Description:</strong> {paper.paperDescription}</p>
              <p className="mb-2"><strong>Link:</strong> <a href={paper.paperUrl} target="_blank" rel="noopener noreferrer">{paper.paperUrl}</a></p>

              <div className="d-flex gap-2 mb-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => setEditingIndex(index)}>Edit</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(paper.paperId)}>Delete</button>
              </div>

              {editingIndex === index && (
                <div className="mt-3 border-top pt-3">
                  <h6 className="mb-3">Edit Paper</h6>
                  <input type="text" className="form-control mb-2" placeholder="Paper Name"
                    value={paper.paperName} onChange={e => handleInputChange(index, 'paperName', e.target.value)} />
                  <input type="text" className="form-control mb-2" placeholder="Category"
                    value={paper.category} onChange={e => handleInputChange(index, 'category', e.target.value)} />
                  <input type="text" className="form-control mb-2" placeholder="Branch"
                    value={paper.branch} onChange={e => handleInputChange(index, 'branch', e.target.value)} />
                  <input type="text" className="form-control mb-2" placeholder="Topic"
                    value={paper.topic} onChange={e => handleInputChange(index, 'topic', e.target.value)} />
                  <input type="text" className="form-control mb-2" placeholder="Paper URL"
                    value={paper.paperUrl} onChange={e => handleInputChange(index, 'paperUrl', e.target.value)} />
                  <textarea className="form-control mb-2" placeholder="Description"
                    value={paper.paperDescription} onChange={e => handleInputChange(index, 'paperDescription', e.target.value)} />
                  <select className="form-select mb-3" value={paper.visibility}
                    onChange={e => handleInputChange(index, 'visibility', e.target.value)}>
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                  </select>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => handleUpdate(paper, index)}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingIndex(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageTeacherPapers;
