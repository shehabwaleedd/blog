import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAuth } from '../../components/authContext/AuthContext';
import { db, auth, storage } from '../../firebase-config';
import "./Account.css"
import { motion } from 'framer-motion';
import { t } from 'i18next';
import { updateProfile } from 'firebase/auth';
import Loading from '../loading/Loading.tsx';
import AccountMobile from './accountResponsive/accountMobile/AccountMobile';
import AccountTablet from './accountResponsive/accountTablet/AccountTablet';
import PasswordOpen from './accountComponents/PasswordOpen';
import PersonalInfo from './accountComponents/PersonalInfo';
import UserPosts from './accountComponents/UserPosts';
import LeftContainer from './accountComponents/LeftContainer';

const Account = ({ isTablet, setIsTablet, isMobile, setIsMobile }) => {
    const { user, logOut, passwordReset } = useUserAuth();
    const navigate = useNavigate();
    const [personalOpen, setPersonalOpen] = useState(true);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [postOpen, setPostOpen] = useState(false);
    const [analyticsOpen, setAnalyticsOpen] = useState(false);
    const [userPosts, setUserPosts] = useState(null);
    const [postList, setPostList] = useState(null);
    const postsCollectionRef = collection(db, "posts");
    const [email, setEmail] = useState('')
    const [error, setError] = React.useState('')
    const [profilePicture, setProfilePicture] = useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("Fetching all posts...");
                const postsSnapshot = await getDocs(postsCollectionRef);
                const allPosts = postsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log("All Posts:", allPosts);
                setPostList(allPosts);

                if (user && user.uid) {
                    console.log("User ID:", user.uid);
                    console.log("Fetching user posts...");
                    const userPostsSnapshot = await getDocs(
                        query(postsCollectionRef, where("author.id", "==", user.uid))
                    );
                    const userPostsData = userPostsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    console.log("User Posts:", userPostsData);
                    setUserPosts(userPostsData);
                }
            } catch (error) {
                console.log("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [user]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        // Upload the image file to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log('Profile picture uploaded to Firebase Storage');

                // Get the download URL of the uploaded image
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        // Update the profile picture in Firebase Authentication
                        const user = auth.currentUser;
                        if (user) {
                            updateProfile(user, { photoURL: url })
                                .then(() => {
                                    console.log('Profile picture updated in Firebase Authentication');
                                    setProfilePicture(url); // Optional: Update the state to show the new profile picture
                                })
                                .catch((error) => {
                                    console.error('Error updating profile picture:', error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                    });
            })
            .catch((error) => {
                console.error('Error uploading profile picture:', error);
            });
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await passwordReset(email);
            navigate('/account')
        } catch (e) {
            setError(e.message);
            console.log(error);
        }
        alert("A Reset Link Has Been Sent To Your Email")
    }


    const handleLogout = async () => {
        try {
            await logOut();
            console.log("logged out successfully");
            navigate('/login');
        } catch (e) {
            console.log(e.message);
        }
    };
    const handlePersonalOpen = () => {
        setPersonalOpen(true);
        setPasswordOpen(false);
        setPostOpen(false);
        setAnalyticsOpen(false)
    };
    const handlePasswordOpen = () => {
        setPasswordOpen(true);
        setPersonalOpen(false);
        setPostOpen(false);
        setAnalyticsOpen(false)
    };
    const handlePostsOpen = () => {
        setPostOpen(true);
        setPersonalOpen(false);
        setPasswordOpen(false);
        setAnalyticsOpen(false)
    };
    const handleAnalyticsOpen = () => {
        setAnalyticsOpen(true);
        setPersonalOpen(false);
        setPasswordOpen(false);
        setPostOpen(false)
    }

    if (!postList) {
        return <Loading height={100} />
    }

    return (
        <motion.section 
            initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.7, ease: [0.42, 0, 0.58, 1] } }}
            exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] } }}
        >
            {isMobile ? (
                <AccountMobile isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile}/>
            ) : isTablet ? (
                <AccountTablet isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile}/>
            ) : (
                <section className='account'>
                    <div className="account__upper">
                        <h1 >{t("account__settings")}</h1>
                        <button onClick={handleLogout}>
                            <h1>Logout</h1>
                        </button>
                    </div>
                    <div className="account__container">
                        <LeftContainer  
                            handlePersonalOpen={handlePersonalOpen}
                            handlePasswordOpen={handlePasswordOpen}
                            handlePostsOpen={handlePostsOpen}   
                            handleImageChange={handleImageChange}
                            user={user}
                        />
                        <div className="right__container">
                            <div className="right__content">
                                {user && personalOpen && user.metadata && (
                                    <PersonalInfo user={user}/>
                                )}
                                {user && passwordOpen && (
                                    <PasswordOpen handlePasswordReset={handlePasswordReset} email={email} setEmail={setEmail}/>
                                )}
                                {postOpen && (
                                    <UserPosts userPosts={userPosts} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </motion.section>
    );
};

export default Account;
