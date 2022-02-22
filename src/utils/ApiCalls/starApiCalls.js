import axios from 'axios';

export const getStars = async (currentPage) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/stars/homepage?size=4&page=${currentPage}`, {
      withCredentials: true,
    });

    return {
      home_stars: data.data.data,
      current_page: data.data.meta.page,
      last_page: data.data.meta.last_page,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getUserStars = async (username, currentPage) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/stars/${username}?size=4&page=${currentPage}`, {
      withCredentials: true,
    });

    return {
      user_stars: data.data.data,
      current_page: data.data.meta.page,
      last_page: data.data.meta.last_page,
    };
  } catch (error) {
    console.log(error);
  }
};
// export const changeStarPage = async (username, currentPage) => {
//   let path = 'homepage';
//   if (window.location.href.includes('profile')) {
//     path = username;
//   }
//   try {
//     const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/stars/${path}?size=4&page=${currentPage}`, {
//       withCredentials: true,
//     });
//     return {
//       next_stars: data.data.data,
//       current_page: data.data.meta.page,
//       last_page: data.data.meta.last_page,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };
