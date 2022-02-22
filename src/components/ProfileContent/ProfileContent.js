/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../Movie/MovieList';
import Pagination from '../Pagination/Pagination';
import StarList from '../Star/StarList';
import { getUserMovies, changeMoviePage } from '../../utils/ApiCalls/movieApiCalls';
import { changeStarPage, getUserStars } from '../../utils/ApiCalls/starApiCalls';
import UserInfo from './UserInfo';

const ProfileContent = ({ navigation, showMovie, showStar, updateStar, updateMovie, user }) => {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  const [stars, setStars] = useState([]);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentStarPage, setCurrentStarPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(async () => {
    if (navigation === 'Movies') {
      setStars([]);
      const { user_movies, last_page, current_page } = await getUserMovies(params.username, currentMoviePage);
      setMovies((pr) => [...pr, ...user_movies]);
      setCurrentMoviePage(current_page);
      setLastPage(last_page);
    } else {
      setMovies([]);
      const { user_stars, last_page, current_page } = await getUserStars(params.username, currentStarPage);
      setStars((pr) => [...pr, ...user_stars]);
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
      {navigation === 'Movies' ? (
        showMovie ? (
          <>
            <MovieList updateMovie={updateMovie} movies={movies} setMovies={setMovies} />

            <>
              {movies.length > 0 && (
                <Pagination currentPage={currentMoviePage} loadMore={setCurrentMoviePage} lastPage={lastPage} />
              )}
            </>
          </>
        ) : (
          <div>not public movies</div>
        )
      ) : navigation === 'Movie Stars' ? (
        showStar ? (
          <>
            <StarList updateStar={updateStar} stars={stars} setStars={setStars} />
            <>
              {stars.length > 0 && (
                <Pagination currentPage={currentStarPage} loadMore={setCurrentStarPage} lastPage={lastPage} />
              )}
            </>
          </>
        ) : (
          <div>not public stars</div>
        )
      ) : (
        <UserInfo user={user} />
      )}
    </>
  );
};

export default ProfileContent;
