import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewMyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.name) {
      alert("User not logged in!");
      setLoading(false);
      return;
    }

    const studentName = user.name;

    axios.get(`http://localhost:8080/api/student-results`, {
      params: { studentName }
    })
    .then(res => {
      setResults(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching results:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading your quiz results...</p>;
  }

  if (results.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>No Quiz Results Found</h2>
        <p style={styles.message}>Looks like you haven't taken any quizzes yet. Give it a try and see your progress here!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{results[0]?.studentName}'s Quiz Results 🎉</h2>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>#</th>
              <th style={styles.headerCell}>Quiz ID</th>
              <th style={styles.headerCell}>Score</th>
              <th style={styles.headerCell}>Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={result.id}
                style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                className="result-row"
              >
                <td style={styles.cell}>{index + 1}</td>
                <td style={styles.cell}>{result.quizId}</td>
                <td style={{...styles.cell, color: result.score === result.totalQuestions ? '#28a745' : '#d6336c'}}>
                  {result.score}
                </td>
                <td style={styles.cell}>{result.totalQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#4B0082',
    marginBottom: '20px',
    fontSize: '2.5rem',
    fontWeight: '700',
    textShadow: '1px 1px 5px rgba(75, 0, 130, 0.7)',
  },
  loading: {
    marginTop: '50px',
    fontSize: '1.3rem',
    color: '#4B0082',
    textAlign: 'center',
  },
  message: {
    fontSize: '1.1rem',
    color: '#333',
    maxWidth: '400px',
    textAlign: 'center',
    marginTop: '10px',
  },
  card: {
    backgroundColor: 'white',
    padding: '25px 35px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '700px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: '#4B0082',
  },
  headerCell: {
    color: 'white',
    padding: '12px 15px',
    fontWeight: '600',
    textAlign: 'center',
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.3s ease',
  },
  rowOdd: {
    backgroundColor: '#ffffff',
    transition: 'background-color 0.3s ease',
  },
  cell: {
    padding: '12px 15px',
    textAlign: 'center',
    fontSize: '1rem',
  }
};

export default ViewMyResults;
