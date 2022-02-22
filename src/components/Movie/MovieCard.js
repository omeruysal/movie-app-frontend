import React, { useContext } from 'react';
import './Movie.css';
import notFound from '../../assets/image/notfound.png';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
const Movie = ({ movie, updateMovie, setMovies }) => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const deleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete the item?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/movies/${id}`, { withCredentials: true });
        setMovies((pre) => [...pre.filter((m) => m.id !== id)]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="movie-card">
        {user.username === params.username && (
          <div className="up-overlay">
            <div onClick={(e) => updateMovie(movie)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square edit"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </div>
            <div onClick={(e) => deleteMovie(movie.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash delete"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </div>
          </div>
        )}
        <Link to={`/movie/${movie.id}`}>
          <img
            className="movie-image"
            src={movie.image ? process.env.REACT_APP_BASE_URL + '/api/uploads/' + movie.image : notFound}
            alt="movie_pic"
          />
        </Link>
        <div className="overlay">
          <Link to={`/movie/${movie.id}`} className="movie-title">
            {movie.name}
          </Link>
          <Link to={`/profile/${movie.user.username}`} className="movie-username">
            {movie.user.username}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Movie;
{
  /* <Link to={`/movie/${movie.id}`} className="movie-title">
{movie.name}
</Link>
<Link to={`/profile/${movie.user.username}`} className="movie-username">
{movie.user.username}
</Link> */
}
