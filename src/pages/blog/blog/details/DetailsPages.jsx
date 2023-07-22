import React, { useState } from "react"
import "./Details.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../../firebase-config";
import ScrollAnimation from "./ScrollAnimation";
import Loading from "../../../../components/supplements/loading/Loading.tsx";
import {BiX} from "react-icons/bi";
import {AiFillEdit} from "react-icons/ai";
import { motion } from "framer-motion";


export const DetailsPages = () => {
  const { id } = useParams()
  const postDocRef = doc(db, "posts", id);
  const [post, setPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();


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
  }, [postDocRef]);

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
          <div className="blog__details_button container">
            <div className='post__tag-details'>
              <a href="/" className="post__hashtag-details" onClick={(e) => { e.preventDefault(); handleCategoryClick(post.category); }} >#{post.category}</a>
            </div>
            <div className="blog__details_button">
              {auth.currentUser?.uid === post.author.id && (
                <div className="blog__details_button-delete">
                  <button className="button__delete" onClick={() => { deletePost(post.id) }}><BiX style={{fontSize: "2rem"}}/></button>
                </div>
              )}
              <div className="blog__details_button-edit">
                {auth.currentUser?.uid === post.author.id && (
                  <button className="button__edit" onClick={handleEditClick}><AiFillEdit style={{fontSize: "2rem", color: "var(--container-color"}}/></button>
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
          <div className='post__date-details container'>
            <div className="details__post__date-imgname">
              <div className="details__post__date_imgname-combined">
                <img src={post.photoURL} alt=""/>
                <span className="blog__post-author">@{post.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default DetailsPages