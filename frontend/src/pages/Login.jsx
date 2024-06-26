import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Footer from '../components/Footer';

function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const isTinyPhone = useMediaQuery({ query: '(max-width: 430px)' });

  const flexColumn = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const flexrow = {
    margin: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const Inputfield = {
    margin: '0 0 16px 0',
    padding: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '34px'
  };
  const labelField = { margin: '0', padding: '0 40px 0 0', fontSize: '1rem' };
  const submit = {
    padding: '10px',
    width: '100%',
    border: 'none',
    borderRadius: '34px',
    backgroundColor: '#007bff',
    color: '#fff'
  };
  const heading = { fontSize: '4rem', margin: '0' };
  const form = {
    width: '50%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around', // Change this line
    alignItems: 'center',
    padding: isTinyPhone ? '30px' : isPhone ? '40px' : '50px',
    borderRadius: '1rem',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgb(63, 63, 63)',
    color: 'whitesmoke'
  };
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />;
  }

  const login = async (event) => {
    event.preventDefault();
    try {
      console.log(email, password);
      const res = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password
      });
      setTokenFunction(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response.data.error);
    }
  };

  return (
    <section
      className="gradient-custom"
      style={{ ...flexColumn, width: '100vw', height: '100vh' }}
    >
      <div style={{ ...form, ...flexColumn }}>
        <div style={flexColumn}>
          <h1 style={heading} className="fw-bold mb-2 text-uppercase">
            Login
          </h1>
          <h4 className="text-white-50">
            Please enter your login and password!
          </h4>
          <form style={flexColumn}>
            <div style={{ flexrow }} className="form-outline form-white">
              <label
                className="form-label"
                htmlFor="typeEmailX"
                style={labelField}
              >
                Email
              </label>
              <input
                type="email"
                id="typeEmailX"
                style={Inputfield}
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div style={{ flexrow }} className="form-outline form-white">
              <label
                className="form-label"
                htmlFor="typePasswordX"
                style={labelField}
              >
                Password
              </label>
              <input
                type="password"
                id="typePasswordX"
                style={Inputfield}
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <p style={{ paddingLeft: '80px' }} className="mb-0">
              Don&apos;t have an account?{' '}
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
                className="text-white-50 fw-bold"
              >
                Sign Up
              </a>
            </p>
          </form>
          <br />
          <button
            className="btn btn-outline-light btn-lg px-5"
            type="submit"
            onClick={login}
            style={submit}
          >
            Login
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Login;
