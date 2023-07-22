import React from 'react'
import LeftContainer from '../../accountComponents/LeftContainer'
import PersonalInfo from '../../accountComponents/PersonalInfo'
import PasswordOpen from '../../accountComponents/PasswordOpen'
import UserPosts from '../../accountComponents/UserPosts'
import { t } from 'i18next';
import "./AccountDesktop.css"
import Loading from '../../../../components/supplements/loading/Loading.tsx';


const AccountDesktop = ({
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
    postList
}) => {
    if (!postList) {
        return <Loading height={100} />
    }

    return (
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
                            <PersonalInfo user={user} />
                        )}
                        {user && passwordOpen && (
                            <PasswordOpen handlePasswordReset={handlePasswordReset} email={email} setEmail={setEmail} />
                        )}
                        {postOpen && (
                            <UserPosts userPosts={userPosts} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountDesktop