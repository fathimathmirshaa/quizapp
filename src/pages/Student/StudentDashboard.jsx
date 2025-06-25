import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>👋 Welcome, Student!</h1>
        <p style={styles.subText}>Choose an option below to get started:</p>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate('/student/quizzes')}>📝 Available Quizzes</button>
          <button style={styles.button} onClick={() => navigate('/student/results')}>📊 View Results</button>
          <button style={styles.button} onClick={() => navigate('/student/notes')}>📚 View Notes</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url('https://images.unsplash.com/photo-1606851091032-5ec111b8a1bb?auto=format&fit=crop&w=1350&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
  },
  subText: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    backgroundColor: '#4B0082',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default StudentDashboard;
