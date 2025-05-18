import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/teacher/login');
  };

  const navItems = [
    { label: 'Profile', path: 'profile', icon: 'bi-person' },
    { label: 'Manage Your Papers', path: 'papers', icon: 'bi-journal-text' },
    { label: 'Add Research Paper', path: 'addpaper', icon: 'bi-plus-circle' },
    { label: 'Search Paper', path: 'searchpaper', icon: 'bi-search' },
  ];

  return (
    <div className="d-flex flex-column bg-dark text-white vh-100 p-4 shadow-lg" style={{ width: '260px' }}>
      <br />
      <h3 className="text-center mb-5 fw-bold border-bottom pb-3">Teacher Panel</h3>
      <ul className="nav flex-column gap-3">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={`/teacher/dashboard/${item.path}`}
              className={`btn w-100 d-flex align-items-center gap-3 px-3 py-2 ${
                location.pathname.includes(item.path) ? 'bg-gradient text-white bg-primary rounded shadow-sm' : 'btn-dark text-light'
              }`}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              <span className="fw-semibold">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right fs-5"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
