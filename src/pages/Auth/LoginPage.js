import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with:", user);

      const res = await axios.post('http://localhost:8080/api/users/login', user);
      const userData = res.data;

      console.log("Login response:", userData);

      // ✅ Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert('Login successful');

      // ✅ Navigate based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (userData.role === 'trainer') {
        navigate('/trainer/dashboard');
      } else if (userData.role === 'student') {
        navigate('/student/dashboard');
      } else {
        alert('Unknown role. Contact support.');
      }

    } catch (err) {
      console.error("Login error:", err);
      alert('Login failed: ' + (err.response?.data || 'Something went wrong'));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Don't have an account? <Link to="/Register">Register</Link>
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
    minHeight: 300
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

export default LoginPage;
