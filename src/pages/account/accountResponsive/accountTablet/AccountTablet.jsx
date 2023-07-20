import React from 'react'
import PasswordOpen from '../../accountComponents/PasswordOpen';
import Loading from '../../../loading/Loading.tsx';
import { t } from 'i18next';
import "./AccountTablet.css"
import UserPosts from '../../accountComponents/UserPosts';
import PersonalInfo from '../../accountComponents/PersonalInfo';
import LeftContainer from '../../accountComponents/LeftContainer';


const AccountTablet = ({
    isTablet,
    isMobile,
    handleLogout,
    handlePersonalOpen,
    handlePasswordOpen,
    handlePostsOpen,
    handleImageChange,
    handlePasswordReset,
    user,
    personalOpen,
    passwordOpen,
    postOpen,
    userPosts,
    email,
    setEmail,
    setIsTablet,
    setIsMobile,
    postList
}) => {

    if (!postList) {
        return <Loading height={100} />
    }
    return (
        <div className='account-tablet'>
            <div className="account__upper-tablet">
                <h1 >{t("account__settings")}</h1>
                <button onClick={handleLogout}>
                    <h1>Logout</h1>
                </button>
            </div>
            <div className="account__container-tablet">
                <LeftContainer
                    handlePersonalOpen={handlePersonalOpen}
                    handlePasswordOpen={handlePasswordOpen}
                    handlePostsOpen={handlePostsOpen}
                    handleImageChange={handleImageChange}
                    user={user}
                    isTablet={isTablet}
                    setIsTablet={setIsTablet}
                    isMobile={isMobile}
                    setIsMobile={setIsMobile}
                />
                <div className="right__container-tablet">
                    {user && personalOpen && user.metadata && (
                        <PersonalInfo user={user} />
                    )}
                    {user && passwordOpen && (
                        <PasswordOpen
                            handlePasswordReset={handlePasswordReset}
                            email={email}
                            setEmail={setEmail}
                            isTablet={isTablet}
                            setIsTablet={setIsTablet}
                            isMobile={isMobile}
                            setIsMobile={setIsMobile}
                        />
                    )}
                    {postOpen && (
                        <UserPosts
                            userPosts={userPosts}
                            isTablet={isTablet}
                            setIsTablet={setIsTablet}
                            isMobile={isMobile}
                            setIsMobile={setIsMobile}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AccountTablet