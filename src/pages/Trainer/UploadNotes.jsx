import React, { useState } from 'react';
import axios from 'axios';

const UploadNotes = () => {
  const [className, setClassName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [noteLink, setNoteLink] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!className) {
      setMessage('❗ Please enter a class or subject name.');
      return;
    }

    if (!pdfFile && !noteLink) {
      setMessage('❗ Please upload a PDF or provide a link.');
      return;
    }

    const formData = new FormData();
    formData.append('className', className);
    if (pdfFile) formData.append('file', pdfFile);
    if (noteLink) formData.append('link', noteLink);

    try {
      await axios.post('http://localhost:8080/api/notes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Notes uploaded successfully!');
      setClassName('');
      setPdfFile(null);
      setNoteLink('');
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('❌ Upload failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📁 Upload Class Notes</h2>

      <input
        type="text"
        placeholder="Enter Class/Subject Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        style={styles.input}
      />

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Or paste a note/link (Google Drive, YouTube, etc.)"
        value={noteLink}
        onChange={(e) => setNoteLink(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleUpload} style={styles.button}>
        Upload Notes
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Segoe UI',
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    textAlign: 'center',
  },
  title: {
    marginBottom: '30px',
    color: '#4B0082',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    width: '60%',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4B0082',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    marginTop: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default UploadNotes;
