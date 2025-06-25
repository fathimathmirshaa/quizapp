import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageQuestions() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/quizzes')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error('Error loading quizzes:', err));
  }, []);

  useEffect(() => {
    if (selectedQuizId) {
      axios.get(`http://localhost:8080/api/quizzes/${selectedQuizId}/questions`)
        .then(res => setQuestions(res.data))
        .catch(err => console.error('Error loading questions:', err));
    }
  }, [selectedQuizId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQuizId) return alert('Please select a quiz');

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/questions/${editId}`, {
          ...formData,
          quizId: selectedQuizId
        });
      } else {
        await axios.post(`http://localhost:8080/api/quizzes/${selectedQuizId}/questions`, formData);
      }

      clearForm();
      const updated = await axios.get(`http://localhost:8080/api/quizzes/${selectedQuizId}/questions`);
      setQuestions(updated.data);
    } catch (err) {
      console.error('Error saving question:', err);
    }
  };

  const handleEdit = (q) => {
    setFormData({
      questionText: q.questionText || '',
      optionA: q.optionA || '',
      optionB: q.optionB || '',
      optionC: q.optionC || '',
      optionD: q.optionD || '',
      correctAnswer: q.correctAnswer || ''
    });
    setEditId(q.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/questions/${id}`);
      const updated = await axios.get(`http://localhost:8080/api/quizzes/${selectedQuizId}/questions`);
      setQuestions(updated.data);
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  const clearForm = () => {
    setFormData({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    });
    setEditId(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Questions</h2>

      <select
        style={styles.select}
        value={selectedQuizId}
        onChange={(e) => setSelectedQuizId(e.target.value)}
      >
        <option value="">-- Select a Quiz Topic --</option>
        {quizzes.map((quiz) => (
          <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
        ))}
      </select>

      {selectedQuizId && (
        <>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              name="questionText"
              placeholder="Enter Question"
              value={formData.questionText}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="optionA"
              placeholder="Option A"
              value={formData.optionA}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="optionB"
              placeholder="Option B"
              value={formData.optionB}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="optionC"
              placeholder="Option C"
              value={formData.optionC}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="optionD"
              placeholder="Option D"
              value={formData.optionD}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="correctAnswer"
              placeholder="Correct Answer (A/B/C/D)"
              value={formData.correctAnswer}
              onChange={handleChange}
              required
            />
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.addBtn}>
                {editId ? 'Update' : 'Add'} Question
              </button>
              <button type="button" style={styles.cancelBtn} onClick={clearForm}>
                Clear
              </button>
            </div>
          </form>

          <div style={styles.listContainer}>
            {questions.map((q) => (
              <div key={q.id} style={styles.card}>
                <p><strong>Q:</strong> {q.questionText}</p>
                <ol type="1">
                  <li>{q.optionA}</li>
                  <li>{q.optionB}</li>
                  <li>{q.optionC}</li>
                  <li>{q.optionD}</li>
                </ol>
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                <button style={styles.editBtn} onClick={() => handleEdit(q)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(q.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '30px', fontFamily: 'Segoe UI', backgroundColor: '#f4f4ff', minHeight: '100vh' },
  heading: { textAlign: 'center', color: '#2c3e50', fontSize: '26px', marginBottom: '20px' },
  select: { padding: '10px', width: '100%', maxWidth: '400px', margin: 'auto', display: 'block', marginBottom: '20px' },
  form: { maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' },
  buttonGroup: { display: 'flex', gap: '10px', justifyContent: 'center' },
  addBtn: { backgroundColor: '#4CAF50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  cancelBtn: { backgroundColor: '#ccc', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  listContainer: { marginTop: '30px', display: 'grid', gap: '15px' },
  card: { background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
  editBtn: { marginRight: '10px', backgroundColor: '#3498db', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#e74c3c', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ManageQuestions;
