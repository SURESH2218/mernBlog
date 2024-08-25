import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyACbKEao3_Z5PdbS3_8Zg5dj2slhDf4mQo",
  authDomain: "mern-stack-blog-aee70.firebaseapp.com",
  projectId: "mern-stack-blog-aee70",
  storageBucket: "mern-stack-blog-aee70.appspot.com",
  messagingSenderId: "712438923866",
  appId: "1:712438923866:web:11618349a7ed59c8d40e63",
};

const app = initializeApp(firebaseConfig);

//google authentication

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
  } catch (error) {
    console.log(error);
  }
  return user;
};
