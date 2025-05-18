import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewResearchPaper = () => {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [author, setAuthor] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
    const userRole = localStorage.getItem('userRole');


  useEffect(() => {
    axios
      .get(`http://localhost:8080/research-papers/${paperId}`)
      .then(async (res) => {
        setPaper(res.data);

        if (res.data.role && res.data.roleId) {
          const roleEndpoint = res.data.role === 'teacher' ? 'teachers' : 'students';
          try {
            const authorRes = await axios.get(`http://localhost:8080/${roleEndpoint}/${res.data.roleId}`);
            setAuthor(authorRes.data);
          } catch (err) {
            console.error('Failed to fetch author info', err);
          }
        }
      })
      .catch((err) => console.error('Error loading paper', err));
  }, [paperId]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/research-papers')
      .then((res) => {
        const recs = res.data.filter((p) => p.visibility === 'PUBLIC' && p.paperId !== paperId);
        setRecommendations(recs);
      })
      .catch((err) => console.error('Error loading recommendations', err));
  }, [paperId]);

  if (!paper) return <div className="text-center mt-5">Loading paper...</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 mb-5 border-0 rounded-4">
        <h2 className="fw-bold mb-4 text-primary">{paper.paperName}</h2>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <strong>Category:</strong>{' '}
            <span className="badge bg-info text-dark">{paper.category}</span>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Branch:</strong>{' '}
            <span className="badge bg-secondary">{paper.branch}</span>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Topic:</strong> {paper.topic}
          </div>
          <div className="col-md-6 mb-3">
            <strong>Visibility:</strong>{' '}
            <span className={`badge ${paper.visibility === 'PUBLIC' ? 'bg-success' : 'bg-danger'}`}>
              {paper.visibility}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <strong>Description:</strong>
          <p className="text-muted mt-1">{paper.paperDescription}</p>
        </div>

        {author && (
          <div className="mb-4">
            <strong>Author:</strong>{' '}
            <div className="d-inline-block bg-light p-2 rounded-3 border">
              <i className="bi bi-person-fill me-2"></i>
              {paper.role === 'teacher' ? author.name || author.fullName : author.name}{' '}
              <span className="badge bg-dark ms-2 text-uppercase">{paper.role}</span>
            </div>
          </div>
        )}

        
        <p>
          <strong>Paper URL: </strong>
          <a href={paper.paperUrl} target="_blank" rel="noopener noreferrer">
            {paper.paperUrl}
          </a>
        </p>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-4">Recommended Papers</h4>
          <div className="row">
            {recommendations.slice(0, 6).map((rec) => (
              <div key={rec.paperId} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{rec.paperName}</h5>
                    <p className="mb-1">
                      <strong>Category:</strong>{' '}
                      <span className="badge bg-info text-dark">{rec.category}</span>
                    </p>
                    <p className="mb-2">
                      <strong>Branch:</strong> {rec.branch}
                    </p>
                    <Link to={`/${userRole}/dashboard/paper/${rec.paperId}`} className="btn btn-sm btn-outline-secondary">
                      View Paper →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewResearchPaper;
