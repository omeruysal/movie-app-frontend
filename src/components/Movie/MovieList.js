import Movie from './MovieCard';
import './Movie.css';

const MovieList = ({ updateMovie, movies, setMovies }) => {
  return (
    <div className="movie-list-card">
      <div className="movie-list">
        {movies?.length > 0 ? (
          movies.map((movie) => <Movie movie={movie} key={movie.id} updateMovie={updateMovie} setMovies={setMovies} />)
        ) : (
          <div>There is no uploaded movie.</div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
