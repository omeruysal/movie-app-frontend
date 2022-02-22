import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { UserContextProvider } from './context/UserContext';
import Profile from './pages/Profile/Profile';
import StarDetails from './pages/StarDetails/StarDetails';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import PrivateRoute from './utils/authRoute';
import { useEffect, useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <NavBar />
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/'} element={<Home />} />
          <Route path={'/profile/:username'} element={<Profile />} />
          <Route path={'/movie/:id'} element={<MovieDetails />} />
          <Route path={'/star/:id'} element={<StarDetails />} />
          <Route path={'*'} element={<PageNotFound />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;

// <Route path={'/'} element={<Home />} />
// <Route path={'/login'} element={<Login />} />
// <Route path={'/register'} element={<Register />} />
// <Route path={'/profile/:username'} element={<Profile />} />
// <Route path={'/movie/:id'} element={<MovieDetails />} />
// <Route path={'/star/:id'} element={<StarDetails />} />
// <Route path={'*'} element={<PageNotFound />} />

{
  /* <BrowserRouter>
<UserContextProvider>
  <NavBar />
  <Routes>
    <Route path={'/login'} element={<Login />} />
    <Route path={'/register'} element={<Register />} />
    <Route exact path="/" element={<PrivateRoute />}>
      <Route exact path="/" element={<Home />} />
    </Route>
    <Route exact path="/" element={<PrivateRoute />}>
      <Route path={'/profile/:username'} element={<Profile />} />
    </Route>
    <Route exact path="/" element={<PrivateRoute />}>
      <Route path={'/movie/:id'} element={<MovieDetails />} />
    </Route>
    <Route exact path="/" element={<PrivateRoute />}>
      <Route path={'/star/:id'} element={<StarDetails />} />
    </Route>
    <Route path={'*'} element={<PageNotFound />} />
  </Routes>
</UserContextProvider>
</BrowserRouter> */
}
