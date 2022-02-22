import React, { useEffect, useState } from 'react';
import './SaveMovie.css';
import axios from 'axios';

function SaveMovie({ setOpenModal, updatedMovie, setUpdatedMovie }) {
  const [form, setForm] = useState(
    updatedMovie
      ? updatedMovie
      : {
          id: '',
          name: '',
          description: '',
          image: '',
          genre: '',
          runTime: '',
        }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((pr) => ({ ...pr, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('id', form.id);
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('genre', form.genre);
      formData.append('runTime', form.runTime);
      if (form.image !== null && form.image !== '') formData.append('image', form.image);
      if (updatedMovie) {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/movies/`, formData, { withCredentials: true });
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/movies/`, formData, { withCredentials: true });
      }
      setOpenModal(false);
      setUpdatedMovie({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h3>Add Movie</h3>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="name"
                className="form-control"
                placeholder="Movie name"
                type="text"
                value={form.name}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="genre"
                className="form-control"
                placeholder="Genre"
                type="text"
                value={form.genre}
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
              <input
                name="runTime"
                className="form-control"
                placeholder="Run time"
                type="number"
                value={form.runTime}
                required
                onChange={handleChange}
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
                  setUpdatedMovie({});
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

export default SaveMovie;
