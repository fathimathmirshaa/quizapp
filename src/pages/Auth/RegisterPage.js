import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/users/register', user);
      alert(res.data);

      setUser({
        name: '',
        email: '',
        password: '',
        role: ''
      });
    } catch (err) {
      alert(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <h2 style={styles.heading}>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="off"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="new-password"
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
          <option value="student">Student</option>
        </select>
        <button type="submit" style={styles.button}>Register</button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
         Already  have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#E6E6FA',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 12,
    boxShadow: '0 0 12px #ccc',
    display: 'flex',
    flexDirection: 'column',
    width: 340,
    minHeight: 400
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    marginBottom: 15,
    padding: 12,
    fontSize: 16
  },
  button: {
    padding: 12,
    backgroundColor: '#9370DB',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    fontWeight: 'bold'
  }
};

export default RegisterPage;
