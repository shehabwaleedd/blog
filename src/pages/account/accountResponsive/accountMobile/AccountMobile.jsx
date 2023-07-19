import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../../components/authContext/AuthContext';
import { auth, db, storage } from '../../../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { motion } from 'framer-motion';
import Loading from '../../../loading/Loading.tsx';
import { t } from 'i18next';
import "./AccountMobile.css"
import { Link } from 'react-router-dom';

const AccountMobile = ({ isTablet, setIsTablet, isMobile, setIsMobile }) => {
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
    const [error, setError] = useState('')
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
        <section className='accountt'>
                    <div className="account__upper-mobile">
                        <h1 >{t("account__settings")}</h1>
                        <button onClick={handleLogout}>
                            <h1>Logout</h1>
                        </button>
                    </div>
                    <div className="account__container-mobile">
                        <div className="left__container-mobile">
                            <div className="left__content-mobile">
                                <div className="left__header">
                                    <img src={user.photoURL} alt={user.displayName} />
                                    <div className="left__name_email">
                                        <h1>Shehab Waleed</h1>
                                        <h2>{user.email}</h2>
                                    </div>
                                </div>
                                <div className="left__bottom">
                                    <div className="left__bottom_content">
                                        <ul>
                                            <li onClick={handlePersonalOpen}>
                                                <h1>{t("account__personal_info")}</h1>
                                            </li>
                                            <li onClick={handlePasswordOpen}>
                                                <h1>{t("account__change_password")}</h1>
                                            </li>
                                            <li onClick={handlePostsOpen}>
                                                <h1>{t("account__my_posts")}</h1>
                                            </li>
                                            <li onClick={handleAnalyticsOpen}>
                                                <h1>{t("account__analytics")}</h1>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right__container-mobile">
                        {user && personalOpen && user.metadata &&(
                                <div className="right__content">
                                    <div className="right__header">
                                        <h1>{t("account__personal_info")}</h1>
                                        <p>{t("account__subtitle")}</p>
                                    </div>
                                    <div className="right__bottom-mobile">
                                        <div className="right__bottom_cards-mobile">
                                            <div className="right__bottom_card-mobile">
                                                <div className="right__bottom_card_header">
                                                    <div className="right__bottom_card_name_icon-mobile">
                                                        <h1>{t("account__name")}</h1>
                                                        <i className='bx bx-user'></i>
                                                    </div>
                                                    <div className="right__bottom_card_text">
                                                        <h1>{user.displayName}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right__bottom_card-mobile">
                                                <div className="right__bottom_card_header-mobile">
                                                    <div className="right__bottom_card_name_icon">
                                                        <h1>{t("account__date_of_birth")}</h1>
                                                        <i className='bx bx-calendar-alt'></i>
                                                    </div>
                                                    <div className="right__bottom_card_text">
                                                        <h1>05 Februray 1999</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right__bottom_card-mobile">
                                                <div className="right__bottom_card_header-mobile">
                                                    <div className="right__bottom_card_name_icon-mobile">
                                                        <h1>{t("account__country/region")}</h1>
                                                        <i className='bx bx-map'></i>
                                                    </div>
                                                    <div className="right__bottom_card_text">
                                                        <h1>Egypt, Cairo.</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right__bottom_card-mobile">
                                                <div className="right__bottom_card_header-mobile">
                                                    <div className="right__bottom_card_name_icon-mobile">
                                                        <h1>{t("language")}</h1>
                                                        <i className='bx bx-globe'></i>
                                                    </div>
                                                    <div className="right__bottom_card_text">
                                                        <h1>English, EN</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right__bottom_card-mobile">
                                                <div className="right__bottom_card_header-mobile">
                                                    <div className="right__bottom_card_name_icon-mobile">
                                                        <h1>{t("navbar__contact")}</h1>
                                                        <i className='bx bx-chat'></i>
                                                    </div>
                                                    <div className="right__bottom_card_text">
                                                        <h1>{user.email}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {user && passwordOpen && (
                                    <motion.div className="right__content"
                                        initial={{ opacity: 0, }}
                                        animate={{ opacity: 1, }}
                                        exit={{ opacity: 0, }}
                                        transition={{ delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                                    >
                                        <div className="right__header">
                                            <h1>Change Password</h1>
                                            <p>In Case You wanted to change your password or just forgot it, you can simply enter your Email Address and follow instructions to reset/change your password..</p>
                                        </div>
                                        <div className="right__bottom">
                                            <div className="forgot__content_right">
                                                <form className="forgot__form" onSubmit={handlePasswordReset}>
                                                    <div className="forgot__input">
                                                        <input type="email" id="email" className="forgot__input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                    <div className="forgot__button">
                                                        <button type="submit" className="forgot__button-sign">
                                                            <i className="uil uil-arrow-left button__icon-forgot"></i>
                                                            Reset Password
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {postOpen && (
                                    <motion.div
                                        className="right__content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            delay: 0.3,
                                            staggerChildren: 3.5,
                                            duration: 0.5,
                                            ease: [0.42, 0, 0.58, 1],
                                        }}
                                    >
                                        <div className="right__header">
                                            <h1>{t('account__my_posts')}</h1>
                                        </div>
                                        {userPosts.length >= 0 ? (
                                            <div className="right__bottom">
                                                <div className="right__bottom_cards-posts">
                                                    {userPosts.map((post) => (
                                                        <Link to={`/details/${post.id}`} key={post.id} className="right__bottom_card">
                                                            <div className="title__details">
                                                                <h1>{post.title}</h1>
                                                                <p>{post.date}</p>
                                                            </div>

                                                            <p className='post__user_p'>{post.postText.slice(0, 64)}</p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>You Have No Posts Yet.</div> 
                                        )}
                                    </motion.div>
                                )}
                        </div>
                    </div>
                </section>
    )
}

export default AccountMobile