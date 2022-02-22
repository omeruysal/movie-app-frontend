import React, { useContext, useEffect, useState } from 'react';
// import './SaveMovie.css';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function UpdateUser({ setOpenModal }) {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const [errors, setErrors] = useState();
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((pr) => ({ ...pr, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('id', form.id);
      formData.append('firstName', form.firstName);
      formData.append('lastName', form.lastName);
      if (form.image !== null && form.image !== '') formData.append('image', form.image);

      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/update`, formData, {
        withCredentials: true,
      });
      updateUser(data.data);
      setOpenModal(false);
      window.location.reload(false);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h3 style={{ color: 'black' }}>Add Movie</h3>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="firstName"
                className="form-control"
                placeholder="First Name"
                type="text"
                value={form.firstName}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                type="text"
                value={form.lastName}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="image"
                className="form-control"
                placeholder="Image"
                type="file"
                onChange={(e) => {
                  setForm((pr) => ({ ...pr, image: e.target.files[0] }));
                }}
              />
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

export default UpdateUser;
