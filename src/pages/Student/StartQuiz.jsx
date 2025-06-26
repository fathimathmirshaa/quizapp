import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StartQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setStudentName(user.name);
    } else {
      alert("Student not logged in!");
      navigate('/login'); // Redirect to login if no user
      return;
    }

    axios.get(`http://localhost:8080/api/quizzes/${quizId}/questions`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error("Error fetching questions:", err));
  }, [quizId, navigate]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    let score = 0;
    const totalQuestions = questions.length;

    const studentAnswers = questions.map(q => {
      const selectedAnswer = selectedAnswers[q.id] || '';
      const correct = selectedAnswer === q.correctAnswer;
      if (correct) score++;
      return {
        studentName,
        quizId: parseInt(quizId),
        questionId: q.id,
        questionText: q.questionText,
        selectedAnswer,
        correctAnswer: q.correctAnswer,
        correct,
      };
    });

    try {
      await axios.post('http://localhost:8080/api/student-answers', studentAnswers);
      await axios.post('http://localhost:8080/api/student-results', {
        studentName,
        quizId: parseInt(quizId),
        score,
        totalQuestions,
      });
      alert("Quiz submitted successfully!");
      navigate('/student/results');
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Something went wrong while submitting your quiz.");
    }
  };

  if (questions.length === 0) {
    return <p style={{ padding: '20px', fontSize: '18px' }}>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selected = selectedAnswers[currentQuestion.id] || '';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Quiz: {quizId}</h2>
        <p style={styles.questionCounter}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p style={styles.questionText}>{currentQuestion.questionText}</p>

        <div style={styles.options}>
          {['optionA', 'optionB', 'optionC', 'optionD'].map(optKey => (
            <label key={optKey} style={styles.optionLabel}>
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={currentQuestion[optKey]}
                checked={selected === currentQuestion[optKey]}
                onChange={() => handleAnswerSelect(currentQuestion.id, currentQuestion[optKey])}
                style={styles.radioInput}
              />
              {currentQuestion[optKey]}
            </label>
          ))}
        </div>

        <div style={styles.buttonGroup}>
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            style={{ ...styles.button, ...styles.backButton, ...(currentQuestionIndex === 0 ? styles.disabledButton : {}) }}
          >
            ← Back
          </button>

          <button onClick={handleNext} style={styles.button}>
            {currentQuestionIndex < questions.length - 1 ? 'Next →' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#e8f0fe',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px 40px',
    width: '600px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#4B0082',
    marginBottom: '10px',
  },
  questionCounter: {
    fontWeight: '600',
    marginBottom: '12px',
    fontSize: '16px',
    color: '#333',
  },
  questionText: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#222',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  optionLabel: {
    fontSize: '16px',
    backgroundColor: '#f7f7f7',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'border-color 0.3s ease',
    userSelect: 'none',
  },
  radioInput: {
    marginRight: '12px',
    cursor: 'pointer',
  },
  buttonGroup: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4B0082',
    color: '#fff',
    padding: '12px 28px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(75, 0, 130, 0.3)',
    transition: 'background-color 0.3s ease',
  },
  backButton: {
    backgroundColor: '#888',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default StartQuiz;
