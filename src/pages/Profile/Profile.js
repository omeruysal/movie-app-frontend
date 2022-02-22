import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userNotFound from '../../assets/image/userprof.png';
import SaveMovie from '../../components/Movie/modals/SaveMovie';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import './Profile.css';
import SaveMovieStar from '../../components/Star/modal/SaveMovieStar';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import UpdateUser from '../../components/ProfileContent/UserModal/UpdateUser';
import Switch from 'react-switch';
import UpdatePassword from '../../components/ProfileContent/UserModal/UpdatePassword';
const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    image: '',
    showMovie: false,
    showStar: false,
  });
  const [movieModal, setMovieModal] = useState(false);
  const [starModal, setStarModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [publicMovies, setPublicMovies] = useState(profile.showMovie);
  const [publicStars, setPublicStars] = useState(profile.showStar);
  const [navigation, setNavigation] = useState('Movies');
  const [updatedMovie, setUpdatedMovie] = useState();
  const [updatedStar, setUpdatedStar] = useState();
  const params = useParams();

  const getUser = async () => {
    try {
      console.log('user geldi');
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${params.username}`, {
        withCredentials: true,
      });
      setProfile(data.data);
      setPublicMovies(data.data.showMovie);
      setPublicStars(data.data.showStar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.username === '') {
      navigate('/login');
    }
    getUser();
  }, [params.username]);

  const updateMovie = (obj) => {
    setUpdatedMovie(obj);
    setMovieModal(true);
  };
  const updateStar = (obj) => {
    setUpdatedStar(obj);
    setStarModal(true);
  };

  const handleChangeMovieStatus = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/public-movies`,
        { value: !publicMovies },
        { withCredentials: true }
      );
      updateUser({ showMovie: !publicMovies });
      setPublicMovies((pr) => !pr);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeStarStatus = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/public-stars`,
        { value: !publicStars },
        { withCredentials: true }
      );
      updateUser({ showStar: !publicStars });
      setPublicStars((pr) => !pr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {movieModal ? (
        <SaveMovie setOpenModal={setMovieModal} updatedMovie={updatedMovie} setUpdatedMovie={setUpdatedMovie} />
      ) : starModal ? (
        <SaveMovieStar setOpenModal={setStarModal} updatedStar={updatedStar} setUpdatedStar={setUpdatedStar} />
      ) : userModal ? (
        <UpdateUser setOpenModal={setUserModal} />
      ) : passwordModal ? (
        <UpdatePassword setOpenModal={setPasswordModal} />
      ) : (
        <>
          <div className="container">
            <div className="profile-frame">
              <div className="profile-header">
                <img
                  className="profile-image"
                  src={
                    profile?.image ? process.env.REACT_APP_BASE_URL + '/api/uploads/' + profile?.image : userNotFound
                  }
                  alt="user"
                />
                <div className="profile-header-right mt-2">
                  <div className="profile-username ml-3">{profile?.username}</div>
                  {user.username === profile?.username && (
                    <div className="d-flex align-items-center">
                      <div className="ml-3">
                        <button className="btn btn-dark" onClick={() => setUserModal(true)}>
                          Edit Profile
                        </button>
                      </div>

                      <div className="ml-3">
                        <label className="d-flex align-items-center" s>
                          <Switch checked={publicMovies} onChange={handleChangeMovieStatus} />
                          <span className="ml-2">Public Movies</span>
                        </label>
                        <label className="d-flex align-items-center">
                          <Switch checked={publicStars} onChange={handleChangeStarStatus} />
                          <span className="ml-2">Public Movie Stars</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="profile-nav">
                <ul className="nav-list">
                  <li className="nav-element" onClick={(e) => setNavigation(e.target.innerHTML)}>
                    Movies
                  </li>
                  <li className="nav-element" onClick={(e) => setNavigation(e.target.innerHTML)}>
                    Movie Stars
                  </li>
                  <li className="nav-element" onClick={(e) => setNavigation(e.target.innerHTML)}>
                    Informations
                  </li>
                </ul>
                {user?.username === profile?.username && (
                  <div>
                    <button className="btn btn-dark mr-1" onClick={() => setMovieModal(true)}>
                      Add Movie
                    </button>
                    <button className="btn btn-dark mr-1" onClick={() => setStarModal(true)}>
                      Add Movie Star
                    </button>
                    <button className="btn btn-dark mr-1" onClick={() => setPasswordModal(true)}>
                      Change Password
                    </button>
                  </div>
                )}
              </div>
              <div className="profile-content">
                <ProfileContent
                  navigation={navigation}
                  showMovie={user.username === params.username || profile?.showMovie}
                  showStar={user.username === params.username || profile?.showStar}
                  updateMovie={updateMovie}
                  updateStar={updateStar}
                  user={profile}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

{
  /* {starModal && <SaveMovieStar setOpenModal={setStarModal} />} */
}
