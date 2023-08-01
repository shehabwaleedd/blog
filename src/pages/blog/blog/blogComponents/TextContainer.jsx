import React from 'react'
import { motion } from 'framer-motion'
import { t } from 'i18next';
import { Link } from 'react-router-dom'


const TextContainer = ({ isMobile, isTablet, filteredPosts, isImageVisible, handleMouseEnter, handleMouseLeave, handleCategoryClick, language, postLists}) => {
    return (
        <>
            {
                isMobile ? (
                    <motion.div className="text-container">
                        <h1 className="work__work-text" style={{ letterSpacing: language === "ar" ? "0rem" : "0.2rem" }}>{t("navbar__articles")}</h1>
                        <div className="scrollbarr">
                            {filteredPosts.map((item) => (
                                <div className="work__title-mobile" key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                                    <Link to={`/details/${item.id}`}>
                                        <h1 data-text={item.title + "..."}>
                                            {item.title.slice(0, 13)}...
                                        </h1>
                                    </Link>
                                    <div className="blog__details-titlecat">
                                        <span className="blog__date">{item.date}</span>
                                        <a
                                            href="/"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCategoryClick(item.category);
                                            }}
                                        >
                                            #{item.category}
                                        </a>
                                        <span className="blog__author">@{item.author.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : isTablet ? (
                    <motion.div className="text-container">
                        <h1 className="work__work-text" style={{ letterSpacing: language === "ar" ? "0rem" : "0.2rem" }}>{t("navbar__articles")}</h1>
                        <div className="scrollbarr">
                            {filteredPosts.map((item) => (
                                <div className="work__title-mobile" key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                                    <Link to={`/details/${item.id}`}>
                                        <h1 data-text={item.title + "..."}>
                                            {item.title.slice(0, 13)}...
                                        </h1>
                                    </Link>
                                    <div className="blog__details-titlecat">
                                        <span className="blog__date">{item.date}</span>
                                        <a
                                            href="/"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCategoryClick(item.category);
                                            }}
                                        >
                                            #{item.category}
                                        </a>
                                        <span className="blog__author">@{item.author.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div className="text-container">
                        <h1 className="work__work-text" style={{ letterSpacing: language === "ar" ? "0rem" : "0.2rem" }}>{t("navbar__articles")}</h1>
                        <div className="scrollbarr">
                            {filteredPosts.map((item) => (
                                <div className="work__title" key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                                    <Link to={`/details/${item.id}`}>
                                        <h1 data-text={item.title + "..."}>
                                            {item.title.slice(0, 27)}
                                        </h1>
                                    </Link>
                                    <div className="blog__details-titlecat">
                                        <span className="blog__date">{item.date}</span>
                                        <a
                                            href="/"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCategoryClick(item.category);
                                            }}
                                        >
                                            #{item.category}
                                        </a>
                                        <span className="blog__author">@{item.author.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
        </>
    )
}

export default TextContainer