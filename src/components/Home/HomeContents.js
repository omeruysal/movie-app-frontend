/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { changeMoviePage, getMovies } from '../../utils/ApiCalls/movieApiCalls';
import { getStars } from '../../utils/ApiCalls/starApiCalls';
import MovieList from '../Movie/MovieList';
import Pagination from '../Pagination/Pagination';
import StarList from '../Star/StarList';

const HomeContents = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [stars, setStars] = useState([]);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentStarPage, setCurrentStarPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(async () => {
    if (navigation === 'Movies') {
      setStars([]);
      const { home_movies, last_page, current_page } = await getMovies(currentMoviePage);
      currentMoviePage > 1 ? setMovies((pr) => [...pr, ...home_movies]) : setMovies(home_movies);
      setCurrentMoviePage(current_page);
      setLastPage(last_page);
    } else {
      setMovies([]);
      const { home_stars, last_page, current_page } = await getStars(currentStarPage);
      currentStarPage > 1 ? setStars((pr) => [...pr, ...home_stars]) : setStars(home_stars);
      setCurrentStarPage(current_page);
      setLastPage(last_page);
    }

    return () => {
      setMovies([]);
      setStars([]);
    };
  }, [navigation, currentMoviePage, currentStarPage]);

  return (
    <>
      <>
        {navigation === 'Movies' ? (
          <>
            <MovieList movies={movies} setMovies={setMovies} />

            <>
              {movies.length > 0 && (
                <Pagination currentPage={currentMoviePage} loadMore={setCurrentMoviePage} lastPage={lastPage} />
              )}
            </>
          </>
        ) : (
          <>
            <StarList stars={stars} setStars={setStars} />
            <>
              {stars.length > 0 && (
                <Pagination currentPage={currentStarPage} loadMore={setCurrentStarPage} lastPage={lastPage} />
              )}
            </>
          </>
        )}
      </>
    </>
  );
};

export default HomeContents;
