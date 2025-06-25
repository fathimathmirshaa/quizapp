import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewResults = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/all-results')  // ✅ Updated endpoint here
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
      });
  }, []);

  const filteredResults = results.filter((result) =>
    (result.studentName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (result.quizTitle?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Review Student Results</h2>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by student name or quiz title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {filteredResults.length === 0 ? (
        <p style={styles.noData}>No matching results found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Quiz Title</th>
              <th>Score</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result, index) => (
              <tr key={result.id}>
                <td>{index + 1}</td>
                <td>{result.studentName}</td>
                <td>{result.quizTitle}</td>
                <td>{result.score}</td>
                <td>{new Date(result.dateSubmitted).toLocaleString()}</td>
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
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#4B0082',
  },
  searchContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px 20px',
    width: '60%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  noData: {
    textAlign: 'center',
    color: '#999',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
};

export default ReviewResults;
