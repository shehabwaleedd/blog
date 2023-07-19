import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { useUserAuth } from '../../components/authContext/AuthContext';
import { db, auth } from '../../firebase-config';
import "./Account.css"
import { motion } from 'framer-motion';
import { t } from 'i18next';
import Loading from '../loading/Loading.tsx';

const Account = ({ isTablet, setIsTablet, isMobile, setIsMobile }) => {
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [personalOpen, setPersonalOpen] = useState(true);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [postOpen, setPostOpen] = useState(false);
    const [analyticsOpen, setAnalyticsOpen] = useState(false);
    const [userPosts, setUserPosts] = useState(null);
    const postRef = collection(db, "posts")
    const [userLoaded, setUserLoaded] = useState(false);
    const [postList, setPostList] = useState(null);
    const postsCollectionRef = collection(db, "posts");
    const currentUser = useUserAuth();

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
        <motion.section className="account"
            initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.7, ease: [0.42, 0, 0.58, 1] } }}
            exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] } }}
        >
            {isMobile ? (
                <div className='accountt'>
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
                            {user && handlePersonalOpen && (
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
                        </div>
                    </div>
                </div>
            ) : isTablet ? (
                <div className='accountt'>
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
                            {user && handlePersonalOpen && (
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
                        </div>
                    </div>
                </div>
            ) : (
                <div className='accounttt'>
                    <div className="account__upper">
                        <h1 >{t("account__settings")}</h1>
                        <button onClick={handleLogout}>
                            <h1>Logout</h1>
                        </button>
                    </div>
                    <div className="account__container">
                        <div className="left__container">
                            <div className="left__content">
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
                        <div className="right__container">
                            <div className="right__content">
                                {user && personalOpen && user.metadata && (
                                    <motion.div className="right__content"
                                        initial={{ opacity: 0, }}
                                        animate={{ opacity: 1, }}
                                        exit={{ opacity: 0, }}
                                        transition={{ delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                                    >
                                        <div className="right__header">
                                            <h1>{t("account__personal_info")}</h1>
                                            <p>{t("account__subtitle")}</p>
                                        </div>
                                        <div className="right__bottom">
                                            <div className="right__bottom_cards">
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
                                                            <h1>{t("account__name")}</h1>
                                                            <i className='bx bx-user'></i>
                                                        </div>
                                                        <div className="right__bottom_card_text">
                                                            <h1>{user.displayName}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
                                                            <h1>{t("account__date_of_birth")}</h1>
                                                            <i className='bx bx-calendar-alt'></i>
                                                        </div>
                                                        <div className="right__bottom_card_text">
                                                            <h1>05 Februray 1999</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
                                                            <h1>{t("account__country/region")}</h1>
                                                            <i className='bx bx-map'></i>
                                                        </div>
                                                        <div className="right__bottom_card_text">
                                                            <h1>Egypt, Cairo.</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
                                                            <h1>{t("language")}</h1>
                                                            <i className='bx bx-globe'></i>
                                                        </div>
                                                        <div className="right__bottom_card_text">
                                                            <h1>English, EN</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
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
                                    </motion.div>
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
                                            <p>Manage your personal information, including phone numbers and email address where you can be contacted</p>
                                        </div>
                                        <div className="right__bottom">
                                            <div className="right__bottom_cards">
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
                                                            <h1>Current Password</h1>
                                                            <i className='bx bx-lock'></i>
                                                        </div>
                                                        <div className="right__bottom_card_text">
                                                            <h1>********</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
                                                            <h1>New Password</h1>
                                                            <i className='bx bx-lock'></i>
                                                        </div>
                                                        <div className="right__bottom_card_text">
                                                            <h1>********</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right__bottom_card">
                                                    <div className="right__bottom_card_header">
                                                        <div className="right__bottom_card_name_icon">
                                                            <h1>Confirm Password</h1>
                                                            <i className='bx bx-lock'></i>
                                                        </div>
                                                        <div className="right__bottom_card_text">
                                                            <h1>********</h1>
                                                        </div>
                                                    </div>
                                                </div>
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
                                            <div>No posts found.</div> // Placeholder message when no posts are available
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    );
};

export default Account;
