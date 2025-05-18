import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const HomePage = () => {
  const [papers, setPapers] = useState([]);
  const [paperCount, setPaperCount] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchPapers();
  }, []);

 const fetchPapers = async () => {
  try {
    const res = await axios.get('http://localhost:8080/research-papers');
    const formattedPapers = res.data.map(paper => ({
      id: paper.paperId,
      title: paper.paperName,
      author: paper.role || 'Unknown',
      year: '2025',
      abstract: paper.category || 'No abstract provided'
    }));
    setPapers(formattedPapers.slice(0, 3));
    setPaperCount(res.data.length);
  } catch (err) {
    console.error('Error fetching research papers', err);
  }
};


  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">📚 Research Paper Repository</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="text-center py-5 bg-light" data-aos="fade-down">
        <div className="container">
          <h1 className="display-5 fw-bold text-primary mb-3">Explore & Publish Research</h1>
          <p className="lead text-muted">Join our academic platform with <strong>{paperCount}</strong> research papers and growing!</p>
        </div>
      </header>

      {/* Login Roles */}
      <section className="container my-5">
        <div className="row g-4 justify-content-center">
          {[
            { label: 'Student', color: 'primary', icon: '🎓', link: '/login/student' },
            { label: 'Teacher', color: 'success', icon: '👩‍🏫', link: '/login/teacher' },
            { label: 'Admin', color: 'danger', icon: '🛡️', link: '/login/admin' }
          ].map((role, idx) => (
            <div className="col-md-4" data-aos="fade-up" data-aos-delay={idx * 150} key={role.label}>
              <div className="card text-center shadow border-0 h-100 bg-white">
                <div className="card-body">
                  <h4 className={`card-title text-${role.color}`}>{role.icon} {role.label} Login</h4>
                  <p className="card-text">Access {role.label.toLowerCase()} dashboard and tools.</p>
                  <a href={role.link} className={`btn btn-outline-${role.color}`}>Go to {role.label} Login</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Papers */}
      <section className="bg-white py-5" data-aos="fade-up">
        <div className="container">
          <h3 className="text-center text-primary mb-4">📄 Featured Research Papers</h3>
          <div className="row">
            {papers.map((paper, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body">
                    <h5 className="card-title">{paper.title}</h5>
                    <p className="text-muted mb-1"><strong>Author:</strong> {paper.author}</p>
                    <p className="text-muted"><strong>Year:</strong> {paper.year}</p>
                    <p className="card-text small">{paper.abstract.slice(0, 100)}...</p>
                    <a href={`/paper/${paper.id}`} className="btn btn-sm btn-primary mt-2">Read More</a>
                  </div>
                </div>
              </div>
            ))}
            {papers.length === 0 && (
              <p className="text-center text-muted">No papers available right now.</p>
            )}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-light py-5" data-aos="zoom-in">
        <div className="container text-center">
          <h3 className="text-success mb-4">🏆 Platform Achievements</h3>
          <div className="row justify-content-center g-4">
            <div className="col-md-3">
              <div className="p-3 bg-white shadow rounded">
                <h2 className="text-primary">+{paperCount}</h2>
                <p>Research Papers</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white shadow rounded">
                <h2 className="text-success">+500</h2>
                <p>Students Registered</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white shadow rounded">
                <h2 className="text-warning">+120</h2>
                <p>Faculty Members</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white shadow rounded">
                <h2 className="text-danger">10+</h2>
                <p>Research Domains</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        <div className="container">
          &copy; {new Date().getFullYear()} Research Paper Repository | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
