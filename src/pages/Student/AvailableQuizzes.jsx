import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

function AvailableQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    axios.get("http://localhost:8080/api/quizzes")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#023e8a',
    },
    quizList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '300px',
    },
    title: {
      color: '#0077b6',
    },
    description: {
      marginBottom: '10px',
    },
    button: {
      backgroundColor: '#023e8a',
      color: 'white',
      border: 'none',
      padding: '10px',
      width: '100%',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    buttonHover: {
      backgroundColor: '#0077b6',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Quizzes</h2>
      <div style={styles.quizList}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div style={styles.card} key={quiz.id}>
              <h3 style={styles.title}>{quiz.title}</h3>
              <p style={styles.description}>{quiz.description}</p>
              <button
                style={styles.button}
                onClick={() => navigate(`/student/start-quiz/${quiz.id}`)} // ✅ Navigate to quiz
                onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
              >
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </div>
    </div>
  );
}

export default AvailableQuizzes;
