
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TrainerDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.title}>Trainer Dashboard</h2>
        <button style={styles.logoutButton} onClick={() => navigate('/')}>
          Logout
        </button>
      </div>
      

      <div style={styles.cardGrid}>
        <div style={styles.card} onClick={() => navigate('/trainer/manage-quiz')}>
          <h3 style={styles.cardTitle}>📝 Manage Quizzes</h3>
          <p style={styles.cardText}>Create or edit your quizzes</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/trainer/manage-questions')}>
          <h3 style={styles.cardTitle}>❓ Manage Questions</h3>
          <p style={styles.cardText}>Add questions to your quizzes</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/trainer/upload-notes')}>
          <h3 style={styles.cardTitle}>📁 Upload Notes</h3>
          <p style={styles.cardText}>Upload PDFs or study materials</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/trainer/view-results')}>
          <h3 style={styles.cardTitle}>📊 View Results</h3>
          <p style={styles.cardText}>See how students performed</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
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
    color: '#00695C',
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

export default TrainerDashboard;
