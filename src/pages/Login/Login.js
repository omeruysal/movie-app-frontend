import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Register/Auth.css';
import { UserContext } from '../../context/UserContext';
import { facebookProvider, googleProvider } from '../../configs/authMethods';
import socialMediaAuth from '../../utils/ApiCalls/socialMediaAuthApiCalls';
const Login = () => {
  const { onLogin } = useContext(UserContext);

  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setErrors();
    setForm((pr) => ({ ...pr, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BASE_URL + '/auth/login',
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );
      onLogin(data.data);
      navigate('/');
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors.credentials);
      }
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const res = await socialMediaAuth(provider);
      const { data } = await axios.post(
        process.env.REACT_APP_BASE_URL + '/auth/login/social',
        {
          email: res,
          username: res,
        },
        { withCredentials: true }
      );
      onLogin(data.data);
      navigate('/');
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors.credentials);
      }
    }
  };

  return (
    <div className="container">
      <aside className="col-sm-4 formN">
        <div className="card login-card">
          <article className="card-body">
            <h4 className="card-title mb-4 mt-1" style={{ color: '#6C757D' }}>
              Login
            </h4>
            <p>
              <button className="btn btn-block btn-outline-info" onClick={() => handleSocialLogin(googleProvider)}>
                <i className="fab fa-twitter"></i> Login via Google
              </button>
              <button className="btn btn-block btn-outline-primary" onClick={() => handleSocialLogin(facebookProvider)}>
                <i className="fab fa-facebook-f"></i> Login via facebook
              </button>
            </p>
            <hr />

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="email"
                  className={errors ? 'form-control is-invalid' : 'form-control'}
                  placeholder="Email"
                  type="email"
                  required
                  onChange={handleChange}
                />{' '}
                <div className="invalid-feedback">{errors && errors}</div>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className={errors ? 'form-control is-invalid' : 'form-control'}
                  placeholder="******"
                  type="password"
                  required
                  onChange={handleChange}
                />{' '}
                <div className="invalid-feedback">{errors && errors}</div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="form-group  ">
                  <button type="submit" className="btn btn-dark btn-block">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </article>
        </div>
      </aside>
    </div>
  );
};

export default Login;
