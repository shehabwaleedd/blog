// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTiYXKijf8IhZloQnf5-zDj08IYgEu6Xo",
  authDomain: "myblog-c2d41.firebaseapp.com",
  projectId: "myblog-c2d41",
  storageBucket: "myblog-c2d41.appspot.com",
  messagingSenderId: "1063354066683",
  appId: "1:1063354066683:web:0cd0a9417a14ad293cf25e",
  measurementId: "G-N8L8B7WPSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};

//
// {user && passwordOpen && (
//   <motion.div className="right__content"
//       initial={{ opacity: 0, }}
//       animate={{ opacity: 1, }}
//       exit={{ opacity: 0, }}
//       transition={{ delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
//   >
//       <div className="right__header">
//           <h1>Change Password</h1>
//           <p>Manage your personal information, including phone numbers and email address where you can be contacted</p>
//       </div>
//       <div className="right__bottom">
//           <div className="right__bottom_cards">
//               <div className="right__bottom_card">
//                   <div className="right__bottom_card_header">
//                       <div className="right__bottom_card_name_icon">
//                           <h1>Current Password</h1>
//                           <i className='bx bx-lock'></i>
//                       </div>
//                       <div className="right__bottom_card_text">
//                           <h1>********</h1>
//                       </div>
//                   </div>
//               </div>
//               <div className="right__bottom_card">
//                   <div className="right__bottom_card_header">
//                       <div className="right__bottom_card_name_icon">
//                           <h1>New Password</h1>
//                           <i className='bx bx-lock'></i>
//                       </div>
//                       <div className="right__bottom_card_text">
//                           <h1>********</h1>
//                       </div>
//                   </div>
//               </div>
//               <div className="right__bottom_card">
//                   <div className="right__bottom_card_header">
//                       <div className="right__bottom_card_name_icon">
//                           <h1>Confirm Password</h1>
//                           <i className='bx bx-lock'></i>
//                       </div>
//                       <div className="right__bottom_card_text">
//                           <h1>********</h1>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//   </motion.div>
// )}
// 

