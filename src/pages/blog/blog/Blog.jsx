import React, { useEffect, useState, useRef } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import "./Blog.css";
import { Link } from "react-router-dom";
import FilteredCategoriesTabs from "../filteredCategories/FilteredCategoriesTabs";
import { motion } from "framer-motion";
import Loading from "../../loading/Loading.tsx";


function Blog() {
  const [postLists, setPostList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const postsCollectionRef = collection(db, "posts");
  const [hoveredImageUrl, setHoveredImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator



  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false); // Set loading state to false when posts are fetched
      } catch (error) {
        console.log("Error fetching posts:", error);
        setIsLoading(false); // Set loading state to false even on error
      }
    };

    getPosts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
  };

  const filteredPosts = postLists.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) {
      return false;
    }
    return true;
  });



  const categories = ["All", "Philosophy", "Nature", "Politics", "Anime"];




  return (
    <React.Fragment>
      <motion.div data-barba="container" initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.25, ease: "easeOut" }} exit={{ opacity: 1 }}>
        <section className="blog">
          <FilteredCategoriesTabs categories={categories} selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
          {isLoading ? ( // Render loading indicator if isLoading is true
              <Loading height={70} />
            ) : (
          <div className="blog__container" >
            <div className="menu">
              <motion.div className="text-container" >
                <h1 className='work__work-text'>Articles</h1>
                <div className="scrollbarr">
                  {filteredPosts.map((item) => (
                    <div className="work__title" key={item.id} onMouseEnter={() => setHoveredImageUrl(item.imageUrls)}
                      onMouseLeave={() => setHoveredImageUrl(null)}>
                      <Link to={`/details/${item.id}`}>
                        <h1 data-text={item.title}>{item.title.slice(0, 17)}</h1>
                      </Link>
                      <div className="blog__details-titlecat">
                        <span className="blog__date">{item.date}</span>
                        <a href="/" onClick={(e) => { e.preventDefault(); handleCategoryClick(item.category) }}>#{item.category}</a>
                        <span className="blog__author">@{item.author.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className="menu__item-image_wrapper">
                <div className="menu__item-image_inner">
                  {filteredPosts.map((image) => (
                    <div key={image.id}>
                      <div className={hoveredImageUrl === image.imageUrls ? 'image-wrapper menu__item-image.fade-in' : 'menu__item-image'} key={image.id}>
                        <img src={image.imageUrls} alt={image.title} className={hoveredImageUrl === image.imageUrls ? 'menu__item-image.fade-in' : 'menu__item-image'} />
                      </div>
                    </div>
                  ))}
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