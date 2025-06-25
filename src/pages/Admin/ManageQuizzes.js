import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    axios.get('http://localhost:8080/api/quizzes')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz(prev => ({ ...prev, [name]: value }));
  };

  const addQuiz = () => {
    if (!newQuiz.title.trim()) {
      alert('Title is required');
      return;
    }
    axios.post('http://localhost:8080/api/quizzes', newQuiz)
      .then(() => {
        fetchQuizzes();
        setNewQuiz({ title: '', description: '' });
      })
      .catch(err => console.error(err));
  };

  const deleteQuiz = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      axios.delete(`http://localhost:8080/api/quizzes/${id}`)
        .then(() => fetchQuizzes())
        .catch(err => console.error(err));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Quizzes</h2>

      <div style={styles.formCard}>
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={newQuiz.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Quiz Description"
          value={newQuiz.description}
          onChange={handleChange}
          style={styles.textarea}
        />
        <button onClick={addQuiz} style={styles.addButton}>Add Quiz</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.id}>
              <td style={styles.td}>{quiz.id}</td>
              <td style={styles.td}>{quiz.title}</td>
              <td style={styles.td}>{quiz.description}</td>
              <td style={styles.td}>
                <button style={styles.deleteButton} onClick={() => deleteQuiz(quiz.id)}>Delete</button>
              </td>
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
    backgroundColor: '#f0f2f5',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '26px',
    color: '#333'
  },
  formCard: {
    maxWidth: '500px',
    margin: '0 auto 30px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    marginBottom: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px'
  },
  textarea: {
    padding: '10px',
    marginBottom: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    minHeight: '60px'
  },
  addButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  th: {
    padding: '14px',
    backgroundColor: '#3f51b5',
    color: 'white',
    textAlign: 'left'
  },
  td: {
    padding: '14px',
    borderBottom: '1px solid #eee'
  },
  deleteButton: {
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ManageQuizzes;