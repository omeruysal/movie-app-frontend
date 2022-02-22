import { signInWithPopup } from 'firebase/auth';
import app, { auth } from '../../configs/firebase-config';

const socialMediaAuth = (provider) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user.email;
    })
    .catch((error) => {
      return error;
    });
};

export default socialMediaAuth;
