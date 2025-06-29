import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewResults = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/student-results");
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleViewAnswers = async (studentName, quizId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/student-answers/by-quiz-and-student?quizId=${quizId}&studentName=${encodeURIComponent(studentName)}`
      );
      setStudentAnswers(res.data || []);
      setSelectedResult({ studentName, quizId });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching answers:", error);
      alert("Failed to load answers.");
    }
  };

  const filteredResults = results.filter(
    (res) =>
      res.studentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📊 Review Student Results</h1>

      <input
        type="text"
        placeholder="Search by student name..."
        style={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Student Name</th>
              <th style={styles.th}>Quiz ID</th>
              <th style={styles.th}>Score</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noData}>No results found</td>
              </tr>
            ) : (
              filteredResults.map((result, index) => (
                <tr key={result.id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{result.studentName}</td>
                  <td style={styles.td}>{result.quizId}</td>
                  <td style={styles.td}>{result.score}</td>
                  <td style={styles.td}>{result.totalQuestions}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.btn}
                      onClick={() => handleViewAnswers(result.studentName, result.quizId)}
                    >
                      View Answers
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal to show answers */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>📄 Answers: {selectedResult?.studentName}</h2>
            <button
              style={styles.closeBtn}
              onClick={() => {
                setShowModal(false);
                setStudentAnswers([]);
              }}
            >
              ❌ Close
            </button>

            <table style={styles.answerTable}>
              <thead>
                <tr>
                  <th>Q.No</th>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {studentAnswers && studentAnswers.length > 0 ? (
                  studentAnswers.map((ans, index) => (
                    <tr key={ans.id}>
                      <td>{index + 1}</td>
                      <td>{ans.questionText}</td>
                      <td>{ans.selectedAnswer || "Not Answered"}</td>
                      <td>{ans.correctAnswer}</td>
                      <td style={{ color: ans.correct ? "green" : "red" }}>
                        {ans.correct ? "✔ Correct" : "❌ Wrong"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={styles.noData}>No answers submitted</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    minHeight: "100vh",
    color: "#333",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    color: "#fff",
    marginBottom: "30px",
  },
  search: {
    display: "block",
    margin: "0 auto 30px auto",
    padding: "12px 20px",
    width: "320px",
    borderRadius: "30px",
    fontSize: "16px",
    border: "none",
  },
  tableWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "white",
    borderRadius: "12px",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px",
    background: "#4a4e69",
    color: "white",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ccc",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#888",
    fontStyle: "italic",
  },
  btn: {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#3182ce", // ✅ Blue shade
  color: "white",
  cursor: "pointer",
  transition: "background-color 0.3s",
},

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "800px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
  },
  modalTitle: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#4a4e69",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  answerTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default ReviewResults;
