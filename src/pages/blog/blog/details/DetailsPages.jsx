import React, { useState } from "react"
import "./Details.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../../firebase-config";
import ScrollAnimation from "./ScrollAnimation";
import Loading from "../../../../components/supplements/loading/Loading.tsx";
import { BiX } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


export const DetailsPages = () => {
  const { id } = useParams()
  const postDocRef = doc(db, "posts", id);
  const postsCollectionRef = collection(db, "posts");
  const [post, setPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRecommendedArticles = async () => {
      if (post && post.category) {
        const recommendedArticlesSnapshot = await getDocs(
          query(postsCollectionRef, where("category", "==", post.category))
        );
        const recommendedArticlesData = recommendedArticlesSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRecommendedArticles(recommendedArticlesData);
      }
    };
    fetchRecommendedArticles();
  }, [post]); // Fetch recommended articles whenever the post or its category changes

  useEffect(() => {
    const getPost = async () => {
      const docSnap = await getDoc(postDocRef);
      if (docSnap.exists()) {
        setPost({ ...docSnap.data(), id: docSnap.id });
      } else {
        // Handle error when post is not found
      }
    };
    getPost();
  }, []); // Fetch post data only once on component mount


  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    navigate("/");
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleCategoryClick = () => {
    setSelectedCategory(post.category);
    navigate(`/filtered/${post.category}`); // Navigate to the filtered category
  };

  const handleDeleteConfirmationShown = () => {
    setDeleteConfirmation(true);
  };

  useEffect(() => {
    if (deleteConfirmation) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [deleteConfirmation])

  if (!post) {
    return <Loading height={100} />
  }


  return (
    <>
      <ScrollAnimation />
      <motion.div className="blog__details" initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.7, ease: [0.42, 0, 0.58, 1] } }} exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] } }}>
        <div className='blog__card_details'>
          <div className='blog__image_container'>
            <img src={post.imageUrls} alt='' />
          </div>
          <div className="blog__details_button_container container">
            <div className='post__tag-details'>
              <a href="/" className="post__hashtag-details" onClick={(e) => { e.preventDefault(); handleCategoryClick(post.category); }} >#{post.category}</a>
              <span className="blog__post-author">@{post.author.name}</span>
            </div>
            <div className="blog__details_button">
              {auth.currentUser?.uid === post.author.id && (
                <>
                  <div className="blog__details_button-delete">
                    <button className="button__delete" onClick={handleDeleteConfirmationShown}><BiX style={{ fontSize: "2rem" }} /></button>
                  </div>
                  <AnimatePresence mode="wait">
                    {deleteConfirmation && (
                      <motion.div className="blog__details_button-delete-confirmation" initial={{ opacity: 0, transition: { staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} animate={{ opacity: 1, transition: { staggerChildren: 3.5, duration: 0.6, ease: [0.42, 0, 0.58, 1] } }} exit={{ opacity: 0, transition: { velocity: 2, staggerChildren: 1.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="blog__details_button-delete-confirmation-buttons">
                          <button className="button__delete_delete" onClick={() => { deletePost(post.id) }}>Yes</button>
                          <button className="button__delete" onClick={() => { setDeleteConfirmation(false) }}>No</button>
                        </div>
                        <span>
                          please note that this action is irreversible, and the post will be deleted permanently.
                        </span>
                      </motion.div>)}
                  </AnimatePresence>
                </>)}
              <div className="blog__details_button-edit">
                {auth.currentUser?.uid === post.author.id && (
                  <button className="button__edit" onClick={handleEditClick}><AiFillEdit style={{ fontSize: "2rem", color: "var(--container-color" }} /></button>
                )}
              </div>
            </div>
          </div>
          <div className="blog__details_post-text container">
            <div className="blog__details_post-textanddate">
              <h3 className="post__title_name-details">{post.title}</h3>
              <label htmlFor=''>{post.date}</label>
            </div>
            <p className="post__subtitle">{post.postText}</p>
          </div>
          {post.category && ( // Add this condition to check if post.category exists
            <div className="details__post__date-imgname container">
              <div className="details__post__date_imgname-combined">
                <h1>Articles You Might Be Interested In...</h1>
                <div className="recommended-articles">
                  {recommendedArticles.map((article) => (
                    <div key={article.id} className="recommended-article">
                      <Link to={`/details/${article.id}`} className="recommendation__card">
                        <img src={article.imageUrls} alt="" />
                        <div className="articles__title_name">
                          <h1 >{article.title.slice(0, 65)}</h1>
                          <span>@{article.author.name}</span>
                        </div>
                        <div className="articles__cat_date">
                          <span>#{article.category}</span>
                          <span>#{article.date}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          )}
        </div>
      </motion.div>
    </>
  )
}

export default DetailsPages