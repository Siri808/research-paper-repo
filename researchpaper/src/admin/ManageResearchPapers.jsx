import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ManageAllResearchPapers = () => {
  const { userRole } = useAuth();
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filterVisibility, setFilterVisibility] = useState('ALL');
  const [filterBranch, setFilterBranch] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterTopic, setFilterTopic] = useState('ALL');

  useEffect(() => {
  const fetchPapersWithUserData = async () => {
    try {
      const papersRes = await axios.get('http://localhost:8080/research-papers');
      const papersData = papersRes.data;

      // Create unique pairs of (role, roleId)
      const uniqueRoleIdPairs = [
        ...new Map(
          papersData.map(p => [`${p.role}-${p.roleId}`, { role: p.role, roleId: p.roleId }])
        ).values()
      ];

      // Fetch data for both teachers and students
      const userPromises = uniqueRoleIdPairs.map(({ role, roleId }) =>
        axios.get(`http://localhost:8080/${role}s/${roleId}`).then(res => ({
          role,
          roleId,
          name: res.data.name,
          email: res.data.email,
        }))
      );

      const userData = await Promise.all(userPromises);

      // Build a lookup map
      const userMap = {};
      userData.forEach(user => {
        userMap[`${user.role}-${user.roleId}`] = {
          name: user.name,
          email: user.email,
        };
      });

      // Enrich papers with teacher or student info
      const enrichedPapers = papersData.map(paper => {
        const key = `${paper.role}-${paper.roleId}`;
        return {
          ...paper,
          userName: userMap[key]?.name || 'Unknown',
          userEmail: userMap[key]?.email || 'Unknown',
        };
      });

      setPapers(enrichedPapers);
      setFilteredPapers(enrichedPapers);
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setLoading(false);
    }
  };

  fetchPapersWithUserData();
}, []);

  const applyFilters = (papers) => {
    return papers.filter(paper => {
      const matchVisibility = filterVisibility === 'ALL' || paper.visibility === filterVisibility;
      const matchBranch = filterBranch === 'ALL' || paper.branch === filterBranch;
      const matchCategory = filterCategory === 'ALL' || paper.category === filterCategory;
      const matchTopic = filterTopic === 'ALL' || paper.topic === filterTopic;
      return matchVisibility && matchBranch && matchCategory && matchTopic;
    });
  };

  useEffect(() => {
    setFilteredPapers(applyFilters(papers));
  }, [filterVisibility, filterBranch, filterCategory, filterTopic, papers]);

  const handleInputChange = (index, field, value) => {
    const updated = [...filteredPapers];
    updated[index][field] = value;
    setFilteredPapers(updated);
  };

  const handleUpdate = async (paper, index) => {
    try {
      await axios.put(`http://localhost:8080/research-papers/${paper.paperId}`, paper);
      alert('Paper updated successfully!');
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

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage All Research Papers (Admin)</h2>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <select className="form-select w-auto" onChange={e => setFilterVisibility(e.target.value)} value={filterVisibility}>
          <option value="ALL">All Visibility</option>
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
        <select className="form-select w-auto" onChange={e => setFilterBranch(e.target.value)} value={filterBranch}>
          <option value="ALL">All Branches</option>
          {[...new Set(papers.map(p => p.branch))].map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
        <select className="form-select w-auto" onChange={e => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="ALL">All Categories</option>
          {[...new Set(papers.map(p => p.category))].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className="form-select w-auto" onChange={e => setFilterTopic(e.target.value)} value={filterTopic}>
          <option value="ALL">All Topics</option>
          {[...new Set(papers.map(p => p.topic))].map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      {filteredPapers.length === 0 ? (
        <p>No research papers found.</p>
      ) : (
        filteredPapers.map((paper, index) => (
          <div key={paper.paperId} className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">{paper.paperName}</h5>
                <span className={`badge ${paper.visibility === 'PUBLIC' ? 'bg-success' : 'bg-secondary'}`}>
                  {paper.visibility}
                </span>
              </div>

              <p className="mb-1"><strong>Branch:</strong> {paper.branch}</p>
              <p className="mb-1"><strong>Category:</strong> {paper.category}</p>
              <p className="mb-1"><strong>Topic:</strong> {paper.topic}</p>
              <p className="mb-1"><strong>Description:</strong> {paper.paperDescription}</p>
              <p className="mb-2"><strong>Link:</strong> <a href={paper.paperUrl} target="_blank" rel="noopener noreferrer">{paper.paperUrl}</a></p>
              <p className="mb-2"><strong>Teacher:</strong> {paper.teacherName} ({paper.teacherEmail})</p>

              <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm" onClick={() => setEditingIndex(index)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(paper.paperId)}>Delete</button>
              </div>

              {editingIndex === index && (
                <div className="border-top pt-3 mt-3">
                  <h6>Edit Paper</h6>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={paper.paperName}
                    onChange={(e) => handleInputChange(index, 'paperName', e.target.value)}
                    placeholder="Paper Name"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={paper.category}
                    onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={paper.branch}
                    onChange={(e) => handleInputChange(index, 'branch', e.target.value)}
                    placeholder="Branch"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={paper.topic}
                    onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                    placeholder="Topic"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={paper.paperUrl}
                    onChange={(e) => handleInputChange(index, 'paperUrl', e.target.value)}
                    placeholder="Paper URL"
                  />
                  <textarea
                    className="form-control mb-2"
                    value={paper.paperDescription}
                    onChange={(e) => handleInputChange(index, 'paperDescription', e.target.value)}
                    placeholder="Description"
                  />
                  <select
                    className="form-select mb-2"
                    value={paper.visibility}
                    onChange={(e) => handleInputChange(index, 'visibility', e.target.value)}
                  >
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

export default ManageAllResearchPapers;
