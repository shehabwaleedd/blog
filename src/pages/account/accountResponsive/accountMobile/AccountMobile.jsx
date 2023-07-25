import React from 'react'
import PersonalInfo from '../../accountComponents/PersonalInfo';
import LeftContainer from '../../accountComponents/LeftContainer';
import Loading from '../../../../components/supplements/loading/Loading.tsx';
import { t } from 'i18next';
import "./AccountMobile.css"
import UserPosts from '../../accountComponents/UserPosts';
import PasswordOpen from '../../accountComponents/PasswordOpen';

const AccountMobile = ({ isTablet, isMobile, handleLogout, handlePersonalOpen, handlePasswordOpen, handlePostsOpen, handleImageChange, handlePasswordReset, user, personalOpen, passwordOpen, postOpen, userPosts, email, setEmail, setIsTablet, setIsMobile, postList}) => {


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
            <LeftContainer handlePersonalOpen={handlePersonalOpen} handlePasswordOpen={handlePasswordOpen} handlePostsOpen={handlePostsOpen} handleImageChange={handleImageChange} user={user} isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile}/>
                <div className="right__container-mobile">
                    {user && personalOpen && user.metadata && (<PersonalInfo user={user} isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile} />)}
                    {user && passwordOpen && (<PasswordOpen handlePasswordReset={handlePasswordReset} email={email} setEmail={setEmail} isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile}/>)}
                    {postOpen && ( <UserPosts userPosts={userPosts} isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile}/>)}
                </div>
            </div>
        </section>
    )
}

export default AccountMobile