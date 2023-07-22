import React from 'react'
import { motion } from 'framer-motion'
import FilteredCategoriesTabs from '../../../filteredCategories/FilteredCategoriesTabs'
import Search from '../../../../../components/supplements/search/Search'
import Loading from '../../../../loading/Loading.tsx'
import TextContainer from '../../blogComponents/TextContainer'

const BlogTablet = ({
    navOpen,
    toggleTheme,
    categories,
    selectedCategory,
    handleCategoryClick,
    filteredPosts,
    setSearchQuery,
    language, setLanguage, languageExpanded, setLanguageExpanded,
    isLoading,
    handleMouseEnter,
    handleMouseLeave,
    hoveredPostId,
    cursorPosition,
    handleImageLoad,
    isMobile,
    isTablet,
}) => {
    return (
        <motion.div
            data-barba="container"
            initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.7, ease: [0.42, 0, 0.58, 1] } }}
            exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] } }}
        >
            <section className="blog">
                <FilteredCategoriesTabs
                    navOpen={navOpen}
                    toggleTheme={toggleTheme}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryClick={handleCategoryClick}
                    language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}
                />
                <Search setSearchQuery={setSearchQuery} language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded} />
                {isLoading ? (
                    <Loading height={70} />
                ) : (
                    <div className="blog__container">
                        <div className="menu">
                            <TextContainer
                                isTablet={isTablet}
                                isMobile={isMobile}
                                filteredPosts={filteredPosts}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                language={language}
                                handleCategoryClick={handleCategoryClick}
                                hoveredPostId={hoveredPostId}
                                cursorPosition={cursorPosition}
                                handleImageLoad={handleImageLoad}
                            />
                        </div>
                    </div>
                )}
            </section>
        </motion.div>
    )
}

export default BlogTablet