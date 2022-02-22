import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Home.css';
import HomeContents from './HomeContents';
const Home = () => {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState('Movies');
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(process.env.REACT_APP_BASE_URL);
    if (user.username === '') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="container">
      <div className="profile-nav">
        <ul className="nav-list">
          <li className="nav-element" onClick={(e) => setNavigation(e.target.innerHTML)}>
            Movies
          </li>
          <li className="nav-element" onClick={(e) => setNavigation(e.target.innerHTML)}>
            Movie Stars
          </li>
        </ul>
      </div>
      <HomeContents navigation={navigation} />
    </div>
  );
};

export default Home;
