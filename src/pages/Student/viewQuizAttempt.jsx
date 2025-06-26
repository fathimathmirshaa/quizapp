import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewQuizAttempt = () => {
  const { quizId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setStudentName(user.name);
      fetchAnswers(user.name);
    } else {
      alert('Student not logged in!');
    }
  }, [quizId]);

  const fetchAnswers = async (name) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/student-answers`, {
        params: { studentName: name, quizId: quizId }
      });
      setAnswers(res.data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📘 Quiz Attempt Review</h2>
      <h3 style={styles.subTitle}>👩 Student: {studentName}</h3>
      <h4 style={styles.subTitle}>📝 Quiz ID: {quizId}</h4>

      {answers.length === 0 ? (
        <p style={styles.noAnswers}>No answers found for this quiz.</p>
      ) : (
        answers.map((a, index) => (
          <div key={a.id} style={styles.card}>
            <h4 style={styles.question}>Q{index + 1}. {a.questionText}</h4>
            <p style={styles.answer}>
              <strong>Your Answer:</strong> {a.selectedAnswer || "Not Answered"}
            </p>
            <p style={styles.answer}>
              <strong>Correct Answer:</strong> {a.correctAnswer}
            </p>
            <p style={{ ...styles.result, color: a.correct ? 'green' : 'red' }}>
              {a.correct ? '✅ Correct' : '❌ Wrong'}
            </p>
          </div>
        ))
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
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#333',
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#666',
  },
  noAnswers: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#999',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  question: {
    fontSize: '18px',
    color: '#222',
  },
  answer: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  result: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default ViewQuizAttempt;
