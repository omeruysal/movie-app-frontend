import axios from 'axios';

export const getMovies = async (currentPage) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/movies/homepage?size=4&page=${currentPage}`, {
      withCredentials: true,
    });
    return {
      home_movies: data.data.data,
      current_page: data.data.meta.page,
      last_page: data.data.meta.last_page,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getUserMovies = async (username, currentPage) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/movies/${username}?size=4&page=${currentPage}`,
      {
        withCredentials: true,
      }
    );
    return {
      user_movies: data.data.data,
      current_page: data.data.meta.page,
      last_page: data.data.meta.last_page,
    };
  } catch (error) {
    console.log(error);
  }
};

// export const changeMoviePage = async (username, currentPage) => {
//   let path = 'homepage';
//   if (window.location.href.includes('profile')) {
//     path = username;
//   }
//   try {
//     const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/movies/${path}?size=4&page=${currentPage}`, {
//       withCredentials: true,
//     });

//     return {
//       next_movies: data.data.data,
//       current_page: data.data.meta.page,
//       last_page: data.data.meta.last_page,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };
