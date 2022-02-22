import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((pr) => ({ ...pr, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/register', form);
      console.log('data :');
      console.log(data);
      navigate('/login');
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="container">
      <aside className="col-sm-4 formN">
        <div className="card login-card">
          <article className="card-body">
            <h3 className="card-title mb-4 mt-1" style={{ color: '#6C757D' }}>
              Sign up
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="username"
                  className={errors.username ? 'form-control is-invalid' : 'form-control'}
                  placeholder="Username"
                  type="test"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors?.username && errors.username}</div>
              </div>
              <div className="form-group">
                <input
                  name="firstName"
                  className={errors.firstName ? 'form-control is-invalid' : 'form-control'}
                  placeholder="First name"
                  type="test"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  name="lastName"
                  className={errors.lastName ? 'form-control is-invalid' : 'form-control'}
                  placeholder="Last name"
                  type="test"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  name="email"
                  className={errors.email ? 'form-control is-invalid' : 'form-control'}
                  placeholder="Email"
                  type="email"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors?.email && errors.email}</div>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className={errors.password ? 'form-control is-invalid' : 'form-control'}
                  placeholder="Password"
                  type="password"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors?.password && errors.password}</div>
              </div>
              <div className="form-group">
                <input
                  name="passwordConfirm"
                  className={errors.passwordConfirm ? 'form-control is-invalid' : 'form-control'}
                  placeholder="Password confirm"
                  type="password"
                  required
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors?.passwordConfirm && errors.passwordConfirm}</div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="form-group  ">
                  <button type="submit" className="btn btn-dark btn-block">
                    Sign Up
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

export default Register;
// import React, { useState } from 'react';
//
//

// const Register = () => {
//

//   return (
//       );
// };

// export default Register;
