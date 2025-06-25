import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/results')
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Results</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Result ID</th>
            <th style={styles.th}>Student ID</th>
            <th style={styles.th}>Quiz ID</th>
            <th style={styles.th}>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td style={styles.td}>{result.id}</td>
              <td style={styles.td}>{result.studentId}</td>
              <td style={styles.td}>{result.quizId}</td>
              <td style={styles.td}>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  th: {
    padding: '12px',
    backgroundColor: '#3f51b5',
    color: 'white',
    textAlign: 'left'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  }
};

export default ViewResults;
