import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ userRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, just redirect to login page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to={`/${userRole}`}>
          QuizApp
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {/* Add links based on role */}
            {userRole === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">Manage Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/reports">Reports</Link>
                </li>
              </>
            )}
            {userRole === 'trainer' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/trainer">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/trainer/quizzes">Manage Quizzes</Link>
                </li>
              </>
            )}
            {userRole === 'student' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/student">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/quizzes">Take Quiz</Link>
                </li>
              </>
            )}
          </ul>

          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
