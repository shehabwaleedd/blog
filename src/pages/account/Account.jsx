import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { useUserAuth } from '../../components/authContext/AuthContext';
import { db } from '../../firebase-config';
import "./Account.css"

const Account = () => {
    const { user, logout } = useUserAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from the backend based on user ID or username
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setUserData(userData);
                } else {
                    // Handle the case when user data does not exist
                }
            } catch (error) {
                // Handle the error fetching user data
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);


    return (
        <section className="account">
            <div className="account__upper">
                <h1>Personal Information</h1>
                <button>
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
                                    <li>
                                        <h1>Personal Information</h1>
                                    </li>
                                    <li>
                                        <h1>Change Password</h1>
                                    </li>
                                    <li>
                                        <h1>My Posts</h1>
                                    </li>
                                    <li>
                                        <h1>Analytics</h1>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right__container">
                    <div className="right__content">
                        <div className="right__header">
                            <h1>Personal Information</h1>
                            <p>Manage your personal information, including phone numbers and email address where you can be contacted</p>
                        </div>
                        <div className="right__bottom">
                            <div className="right__bottom_cards">
                                <div className="right__bottom_card">
                                    <div className="right__bottom_card_header">
                                        <div className="right__bottom_card_name_icon">
                                            <h1>Name</h1>
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
                                            <h1>Date Of Birth</h1>
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
                                            <h1>Country/Region</h1>
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
                                            <h1>Language</h1>
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
                                            <h1>Contact</h1>
                                            <i className='bx bx-chat'></i>
                                        </div>
                                        <div className="right__bottom_card_text">
                                            <h1>shehabwaleedd@gmail.com</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;
