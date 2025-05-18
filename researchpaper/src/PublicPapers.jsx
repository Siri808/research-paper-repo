import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PublicResearchPapers = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);

    const userRole = localStorage.getItem('userRole');

  // Dynamic branches and categories from papers
  const [availableBranches, setAvailableBranches] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await axios.get('http://localhost:8080/research-papers');
        const publicPapers = res.data.filter((p) => p.visibility === 'PUBLIC');

        const papersWithAuthors = await Promise.all(
          publicPapers.map(async (paper) => {
            try {
              const roleEndpoint = paper.role === 'teacher' ? 'teachers' : 'students';
              const authorRes = await axios.get(`http://localhost:8080/${roleEndpoint}/${paper.roleId}`);
              return {
                ...paper,
                author: authorRes.data.name || 'Unknown',
              };
            } catch (err) {
              console.error('Error fetching author:', err);
              return {
                ...paper,
                author: 'Unknown',
              };
            }
          })
        );

        setPapers(papersWithAuthors);
        setFilteredPapers(papersWithAuthors);

        // Extract unique branches and categories from fetched papers
        const uniqueBranches = [...new Set(papersWithAuthors.map(p => p.branch).filter(Boolean))];
        const uniqueCategories = [...new Set(papersWithAuthors.map(p => p.category).filter(Boolean))];

        setAvailableBranches(uniqueBranches);
        setAvailableCategories(uniqueCategories);

      } catch (error) {
        console.error('Error fetching papers:', error);
        alert('Failed to load papers.');
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  useEffect(() => {
    let temp = [...papers];

    if (search.trim() !== '') {
      temp = temp.filter((p) =>
        p.paperName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (branchFilter !== '') {
      temp = temp.filter((p) => p.branch === branchFilter);
    }

    if (categoryFilter !== '') {
      temp = temp.filter((p) => p.category === categoryFilter);
    }

    setFilteredPapers(temp);
  }, [search, branchFilter, categoryFilter, papers]);

  if (loading) return <div className="text-center mt-5">Loading Papers...</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Public Research Papers</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            placeholder="Search by paper name..."
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
          >
            <option value="">All Branch</option>
            {availableBranches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Category</option>
            {availableCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="text-center">No papers found.</div>
      ) : (
        <div className="row">
          {filteredPapers.map((paper) => (
            <div className="col-md-6 col-lg-4 mb-4" key={paper.id}>
              <div className="card h-100 shadow border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{paper.paperName}</h5>
                  <p className="card-text text-muted mb-1"><strong>Author:</strong> {paper.author}</p>
                  <p className="card-text mb-1"><strong>Branch:</strong> {paper.branch}</p>
                  <p className="card-text mb-1"><strong>Topic:</strong> {paper.topic}</p>
                  <p className="card-text mb-1"><strong>Category:</strong> {paper.category}</p>
                  <p className="card-text mb-3" style={{ flexGrow: 1 }}>{paper.paperDescription.slice(0, 100)}...</p>
                  <Link to={`/${userRole}/dashboard/paper/${paper.paperId}`} className="btn btn-primary mt-auto">View Paper</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicResearchPapers;
