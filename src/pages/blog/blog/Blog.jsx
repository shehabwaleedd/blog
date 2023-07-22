import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import "../blog/blogRespnsive/blogDesktop/BlogDesktop.css"
import BlogDesktop from "./blogRespnsive/blogDesktop/BlogDesktop";
import BlogMobile from "./blogRespnsive/blogMobile/BlogMobile";
import BlogTablet from "./blogRespnsive/blogTablet/BlogTablet";

function Blog({ isTablet, setIsTablet, isMobile, setIsMobile, navOpen, setNavOpen, toggleTheme, language, setLanguage, languageExpanded, setLanguageExpanded }) {
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
      {isMobile ? (
        <BlogMobile
          setIsMobile={setIsMobile}
          isMobile={isMobile}
          navOpen={navOpen}
          toggleTheme={toggleTheme}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          setSearchQuery={setSearchQuery}
          language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}
          isLoading={isLoading}
          filteredPosts={filteredPosts}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isTablet={isTablet}
          setIsTablet={setIsTablet}
          handleImageLoad={handleImageLoad}
          imageSize={imageSize}
          isImageVisible={isImageVisible}
        />
      ) : isTablet ? (
        <BlogTablet
          setIsMobile={setIsMobile}
          isMobile={isMobile}
          navOpen={navOpen}
          toggleTheme={toggleTheme}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          setSearchQuery={setSearchQuery}
          language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}
          isLoading={isLoading}
          filteredPosts={filteredPosts}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isTablet={isTablet}
          setIsTablet={setIsTablet}
          handleImageLoad={handleImageLoad}
          imageSize={imageSize}
          isImageVisible={isImageVisible}
        />
      ) : (
        <BlogDesktop
          setIsMobile={setIsMobile}
          isMobile={isMobile}
          navOpen={navOpen}
          toggleTheme={toggleTheme}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          setSearchQuery={setSearchQuery}
          language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}
          isLoading={isLoading}
          filteredPosts={filteredPosts}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isTablet={isTablet}
          setIsTablet={setIsTablet}
          handleImageLoad={handleImageLoad}
          imageSize={imageSize}
          isImageVisible={isImageVisible}
        />
      )}
    </React.Fragment>
  );
}

export default Blog;
