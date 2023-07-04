/* eslint-disable jsx-a11y/img-redundant-alt */
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useUserAuth } from "../../../../../components/authContext/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebase-config";
import { v4 } from "uuid";
import Loading from "../../../../loading/Loading.tsx";
import "./EditPost.css";

const EditPage = () => {
  const { id } = useParams();
  const postDocRef = doc(db, "posts", id);
  const [post, setPost] = useState(null);
  const { currentUser } = useUserAuth();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const docSnap = await getDoc(postDocRef);
        if (docSnap.exists()) {
          setPost({ ...docSnap.data(), id: docSnap.id });
          setImageUrl(docSnap.data().imageUrls);
        } else {
          setError("Post not found");
        }
      } catch (error) {
        console.error("Error getting post: ", error);
        setError("Error getting post");
      }
    };
    getPost();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    let imageUrl = post.imageUrls;
    if (imageFile) {
      const imagesRef = ref(storage, "images/");
      const imageName = v4();
      const imageRef = ref(imagesRef, imageName);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const updatedPost = {
      title: formData.get("title"),
      category: formData.get("category"),
      postText: formData.get("postText"),
      imageUrls: imageUrl,
    };

    await updateDoc(postDocRef, updatedPost);
    navigate(`/details/${id}`);
  };

  if (!post) {
    return <Loading height={100} />;
  }

  return (
    <section className="edit ">
      <div className="edit__page">
        <div className="edit__container ">
          <form onSubmit={handleUpdate}>
            <div className="form__container-edit">
              <div className="edit__input-image">
                {imageUrl && <img src={imageUrl} alt="Selected Image" />}
                <label htmlFor="upload" className="edit-file-upload container">
                  <span>Choose File</span>
                  <input style={{ display: "none" }} accept="image/*" type="file" name="imageUrls" defaultValue="" onChange={handleImageChange} id="upload" />
                </label>
              </div>
              <div className="edit__input-title container">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" defaultValue={post.title} />
              </div>
              <div className="edit__input-category container">
                <select className="create__input-field" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select Category...</option>
                  <option value="Anime">Anime</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Politics">Politics</option>
                  <option value="Nature">Nature</option>
                </select>
              </div>
              <div className="edit__input-post container">
                <label htmlFor="postText">Post</label>
                <textarea name="postText" defaultValue={post.postText} />
                <button className="edit__button button--flex " type="submit">Update Post</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPage;
