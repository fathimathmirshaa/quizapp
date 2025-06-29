import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Student Dashboard</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      {/* Dashboard Cards */}
      <div style={styles.cardGrid}>
        <div style={styles.card} onClick={() => navigate('/student/quizzes')}>
          <h3 style={styles.cardTitle}>📝 Available Quizzes</h3>
          <p style={styles.cardText}>Take quizzes assigned to you</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/student/results')}>
          <h3 style={styles.cardTitle}>📊 View Results</h3>
          <p style={styles.cardText}>Check your quiz performance</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/student/notes')}>
          <h3 style={styles.cardTitle}>📚 View Notes</h3>
          <p style={styles.cardText}>Read uploaded notes by trainer</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#F3F4F6',
    minHeight: '100vh',
    padding: '0',
    margin: '0',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4B0082',
    padding: '20px 40px',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
  },
  logoutButton: {
    backgroundColor: '#fff',
    color: '#4B0082',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: '0.3s ease',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    padding: '50px 40px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardTitle: {
    fontSize: '20px',
    color: '#4B0082',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '14px',
    color: '#555',
  },
};

export default StudentDashboard;
