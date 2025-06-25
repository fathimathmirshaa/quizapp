import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StartQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Load current user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      console.log("Loaded user from localStorage:", parsedUser); // ✅ Debug
    } else {
      console.warn("No user found in localStorage");
    }
  }, []);

  // ✅ Fetch quiz details
  useEffect(() => {
    axios.get(`http://localhost:8080/api/quizzes/${quizId}`)
      .then(res => setQuiz(res.data))
      .catch(console.error);
  }, [quizId]);

  // ✅ Fetch questions
  useEffect(() => {
    axios.get(`http://localhost:8080/api/quizzes/${quizId}/questions`)
      .then(res => setQuestions(res.data))
      .catch(console.error);
  }, [quizId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const payload = {
      studentId: currentUser?.id || null,
      studentName: currentUser?.name || "Guest",
      quizId: Number(quizId),
      quizTitle: quiz?.title || '',
      score,
      dateSubmitted: new Date()
    };

    console.log("Submitting result payload:", payload); // ✅ Debug

    axios.post("http://localhost:8080/api/all-results", payload)
      .then(() => {
        alert(`Quiz submitted!\nYou scored ${score} out of ${questions.length}`);
      })
      .catch(err => {
        console.error("Error saving result:", err);
        alert("Error submitting quiz. Please try again.");
      });
  };

  const styles = {
    container: {
      padding: '40px',
      background: 'linear-gradient(to right, #f0f8ff, #e0f7fa)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    quizHeader: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#023e8a',
    },
    questionCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    questionText: {
      marginBottom: '15px',
      color: '#0077b6',
    },
    option: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '16px',
    },
    radio: {
      marginRight: '10px',
    },
    submitButton: {
      display: 'block',
      margin: '30px auto 0',
      backgroundColor: '#0077b6',
      color: '#ffffff',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.quizHeader}>
        Start Quiz: {quiz ? quiz.title : 'Loading...'}
      </h2>

      {questions.length > 0 ? (
        questions.map((q, i) => (
          <div key={q.id} style={styles.questionCard}>
            <h4 style={styles.questionText}>
              Q{i + 1}. {q.questionText}
            </h4>
            {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, idx) => (
              <label key={idx} style={styles.option}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  style={styles.radio}
                  checked={answers[q.id] === opt}
                  onChange={() => handleOptionChange(q.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No questions available.</p>
      )}

      {questions.length > 0 && (
        <button
          style={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default StartQuiz;
