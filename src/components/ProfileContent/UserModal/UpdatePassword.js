import React, { useContext, useEffect, useState } from 'react';
// import './SaveMovie.css';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from 'firebase/auth';

function UpdatePassword({ setOpenModal }) {
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors();
    setForm((pr) => ({ ...pr, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/updatePassword`, form, { withCredentials: true });
      console.log(form);
      setOpenModal(false);
      window.location.reload(false);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors.password);
      }
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h3 style={{ color: 'black' }}>Update Password</h3>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="password"
                className={errors ? 'form-control is-invalid' : 'form-control'}
                placeholder="Password"
                type="password"
                value={form.password}
                required
                onChange={handleChange}
              />
            </div>
            <div className="invalid-feedback">{errors && errors}</div>
            <div className="form-group">
              <input
                name="passwordConfirm"
                className={errors ? 'form-control is-invalid' : 'form-control'}
                placeholder="Password Confirm"
                type="password"
                value={form.passwordConfirm}
                required
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors && errors}</div>
            </div>

            <div className="footer">
              <button
                className="btn btn-danger"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-dark">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
