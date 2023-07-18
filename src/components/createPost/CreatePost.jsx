// ...
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import { storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const fileId = uuidv4();
    const imagesRef = ref(storage, `images/${fileId}`);

    try {
      await uploadBytes(imagesRef, file);
      const downloadURL = await getDownloadURL(imagesRef);
      setImageUrls([downloadURL]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearImage = () => {
    setImageUrls([]);
  };


  const createPost = async () => {
    setError("");
    try {
      const newPost = {
        title,
        imageUrls,
        postText,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        date: new Date().toLocaleDateString(),
        category,
        photoURL: auth.currentUser.photoURL,
      };
      await addDoc(postsCollectionRef, newPost);
      resetForm();
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const resetForm = () => {
    setTitle("");
    setPostText("");
    setCategory("");
    setImageUrls([]);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    createPost();
  };

  // Custom toolbar options for React Quill
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }], // Font family dropdown
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ];



  return (
    <motion.div 
    initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.3, ease: [0.42, 0, 0.58, 1] } }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.3, ease: [0.42, 0, 0.58, 1] } }}
    exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 0.3, ease: [0.42, 0, 0.58, 1] } }}
    >
      <section className="create section">
        <div className="create__page">
          <div className="create__container">
            <form className="create__form" onSubmit={handleCreatePost}>
              <div className="create__input-image">
                <AnimatePresence>
                  {imageUrls.map((url, index) => (
                    <motion.div className="create__image_wrap" key={index}                       
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}>
                      <motion.img src={url} alt=""    
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}/>
                      <button className="create__image-clear" onClick={clearImage}>
                        Clear
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <label htmlFor="upload" className="custom-file-upload">
                  <span>Choose File</span>
                  <input id="upload" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
                </label>
              </div>
              <div className="create__input-title">
                <input placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="create__input-category">
                <select className="create__input-field" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select Category...</option>
                  <option value="Anime">Anime</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Politics">Politics</option>
                  <option value="Nature">Nature</option>
                  <option value="Poetry">Poetry</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>
              <div className="create__input-post" >
                <ReactQuill value={postText} onChange={setPostText} modules={{ toolbar: toolbarOptions }} style={{ height: '15.75rem' }} />
              </div>
              {error && <p className="create__error">{error}</p>}
              <div className="create__button-div">
                <button className="create__button button--flex" type="submit">
                  Submit Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CreatePost;
