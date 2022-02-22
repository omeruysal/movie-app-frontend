import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCW2QAIo6-6hDBJcFPi0Psa4n_742bH_fk',
  authDomain: 'bootcamp-movie-app.firebaseapp.com',
  projectId: 'bootcamp-movie-app',
  storageBucket: 'bootcamp-movie-app.appspot.com',
  messagingSenderId: '247687991170',
  appId: '1:247687991170:web:7f46099c951c70d14d099b',
  measurementId: 'G-8BEHYGPD9Y',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
