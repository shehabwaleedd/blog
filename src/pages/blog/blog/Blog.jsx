import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import "./Blog.css";
import { Link } from "react-router-dom";
import FilteredCategoriesTabs from "../filteredCategories/FilteredCategoriesTabs";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../../loading/Loading.tsx";
import Search from "../../../components/search/Search";
import { t } from "i18next";

function Blog({ navOpen, setNavOpen, toggleTheme, language, setLanguage, languageExpanded, setLanguageExpanded}) {
  const [postLists, setPostList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const postsCollectionRef = collection(db, "posts");
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isImageVisible, setIsImageVisible] = useState(false);



  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {


    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  const handleImageLoad = (e) => {
    const { width, height } = e.target;
    setImageSize({ width, height });
  };


  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
  };

  const filteredPosts = postLists.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const categories = ["All", "Philosophy", "Nature", "Politics", "Anime"];

  const handleMouseEnter = (postId) => {
    setHoveredPostId(postId);
    setIsImageVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
    setIsImageVisible(false);

  };

  return (
    <React.Fragment>
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
          <Search setSearchQuery={setSearchQuery} language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}/>
          {isLoading ? (
            <Loading height={70} />
          ) : (
            <div className="blog__container">
              <div className="menu">
                <motion.div className="text-container">
                  <h1 className="work__work-text">{t("navbar__articles")}</h1>
                  <div className="scrollbarr">
                    {filteredPosts.map((item) => (
                      <div className="work__title" key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                        <Link to={`/details/${item.id}`}>
                          <h1 data-text={item.title + "..."}>
                            {item.title.slice(0, 27)}...
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
                <div className="menu__item-image_wrapper">
                  <div className="menu__item-image_inner">
                    <AnimatePresence>
                      {isImageVisible && (
                        <motion.div>
                          {filteredPosts.map((image) => (
                            <div key={image.id}>
                              <div className={hoveredPostId === image.id ? "image-wrapper menu__item-image fade-in" : "menu__item-image"}
                                key={image.id} style={hoveredPostId === image.id ? { transform: `translate(${cursorPosition.x - imageSize.width / 2}px, ${cursorPosition.y - imageSize.height / 2}px)`, } : {}}>
                                {hoveredPostId === image.id && (
                                  <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    src={image.imageUrls}
                                    alt={image.title}
                                    className="menu__item-image fade-in"
                                    onLoad={handleImageLoad}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )
                      }
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </motion.div>
    </React.Fragment>
  );
}

export default Blog;
