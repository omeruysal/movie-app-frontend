import axios from 'axios';

export const Logout = async () => {
  try {
    await axios.post(process.env.REACT_APP_BASE_URL + '/auth/logout', {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
