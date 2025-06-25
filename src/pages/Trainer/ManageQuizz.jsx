import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageQuizz() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/quizzes');
      setQuizzes(response.data);
      
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quiz = { title, description };

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/quizzes/${editId}`, quiz);
      } else {
        await axios.post('http://localhost:8080/api/quizzes', quiz);
      }
      setTitle('');
      setDescription('');
      setEditId(null);
      fetchQuizzes();
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleEdit = (quiz) => {
    setTitle(quiz.title);
    setDescription(quiz.description);
    setEditId(quiz.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/quizzes/${id}`);
      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Manage Quizzes</h2>
      
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.addButton}>
          {editId ? 'Update Quiz' : 'Create Quiz'}
        </button>
      </form>

      <div style={styles.quizList}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} style={styles.quizCard}>
            <h3 style={styles.quizTitle}>{quiz.title}</h3>
            <p style={styles.quizDesc}>{quiz.description}</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => handleEdit(quiz)} style={styles.editButton}>✏️ Edit</button>
              <button onClick={() => handleDelete(quiz.id)} style={styles.deleteButton}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#4B0082',
    marginBottom: '30px',
  },
  formCard: {
    maxWidth: '600px',
    margin: '0 auto 40px auto',
    padding: '25px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    marginBottom: '14px',
    fontSize: '16px',
    border: '1px solid #bbb',
    borderRadius: '8px',
  },
  textarea: {
    padding: '12px',
    marginBottom: '14px',
    fontSize: '16px',
    border: '1px solid #bbb',
    borderRadius: '8px',
    minHeight: '80px',
  },
  addButton: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#6A1B9A',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  quizList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  quizCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  quizTitle: {
    fontSize: '20px',
    color: '#4B0082',
    marginBottom: '10px',
  },
  quizDesc: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#0288d1',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ManageQuizz;
