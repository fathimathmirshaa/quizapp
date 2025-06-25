import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewMyResults = () => {
  const [results, setResults] = useState([]);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setStudentName(user.name);
      fetchResults(user.name);
    } else {
      alert('Student not logged in!');
    }
  }, []);

  const fetchResults = async (name) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/student-results?studentName=${name}`);
      setResults(res.data);
    } catch (err) {
      console.error('Error fetching student results:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📘 My Quiz Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Quiz ID</th>
              <th>Score</th>
              <th>Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr key={r.id}>
                <td>{index + 1}</td>
                <td>{r.quizId}</td>
                <td>{r.score}</td>
                <td>{r.totalQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
};

export default ViewMyResults;
