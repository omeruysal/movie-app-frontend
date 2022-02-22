import { createContext, useState } from 'react';
import { Logout } from '../utils/ApiCalls/userApiCalls';

export const UserContext = createContext(null);
const defaultUser = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  image: '',
  showMovie: false,
  showStar: false,
  isLoggedIn: false,
};
export const UserContextProvider = ({ children }) => {
  const lsUser = localStorage.getItem('user');
  const [user, setUser] = useState(lsUser ? JSON.parse(lsUser) : defaultUser);

  const onLogin = (data) => {
    console.log(data);
    setUser({ ...data, isLoggedIn: true });
    localStorage.setItem('user', JSON.stringify({ ...data, isLoggedIn: true }));
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser, isLoggedIn: true }));
    setUser((pr) => ({ ...pr, ...updateUser, isLoggedIn: true }));
    // setUser({ ...user, ...updateUser, isLoggedIn: true });
  };

  const onLogout = () => {
    Logout();
    setUser({ ...defaultUser });
    localStorage.removeItem('user');
  };
  return <UserContext.Provider value={{ onLogout, onLogin, user, updateUser }}>{children}</UserContext.Provider>;
};
