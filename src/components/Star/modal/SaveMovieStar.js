import React, { useState } from 'react';
import '../../Movie/modals/SaveMovie.css';
import axios from 'axios';

function SaveMovieStar({ setOpenModal, updatedStar, setUpdatedStar }) {
  const [form, setForm] = useState(
    updatedStar
      ? updatedStar
      : {
          id: '',
          name: '',
          description: '',
          age: '',
          image: '',
        }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    //  setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((pr) => ({ ...pr, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(form);
      const formData = new FormData();
      formData.append('id', form.id);
      formData.append('name', form.name);
      formData.append('age', form.age);
      formData.append('description', form.description);
      if (form.image !== null && form.image !== '') formData.append('image', form.image);

      if (updatedStar) {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/stars/`, formData, { withCredentials: true });
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/stars/`, formData, { withCredentials: true });
      }
      setOpenModal(false);
      setUpdatedStar({});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h3>Add Movie Star</h3>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="name"
                className="form-control"
                placeholder="Star name"
                type="text"
                value={form.name}
                required
                onChange={handleChange}
              />
              {/* <div className="invalid-feedback">{errors?.username && errors.username}</div> */}
            </div>
            <div className="form-group">
              <input
                name="age"
                className="form-control"
                placeholder="Age"
                type="text"
                value={form.age}
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
            <div className="form-group">
              <textarea
                maxLength={100}
                name="description"
                className="form-control"
                placeholder="Description"
                type="text"
                value={form.description}
                required
                onChange={handleChange}
              />
            </div>
            <div className="footer">
              <button
                className="btn btn-danger"
                onClick={() => {
                  setOpenModal(false);
                  setUpdatedStar({});
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

export default SaveMovieStar;
