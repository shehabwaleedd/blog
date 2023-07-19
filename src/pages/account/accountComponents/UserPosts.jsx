import React from 'react'
import { motion } from 'framer-motion'
import { t } from 'i18next';
import { Link } from 'react-router-dom'


const UserPosts = ({userPosts}) => {
    return (
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
    )
}

export default UserPosts