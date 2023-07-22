import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import "./FilteredCategories.css";
import Blog from "../blog/Blog";

const FilteredCategories = ({ navOpen, toggleTheme }) => {
    const { category } = useParams();
    const [postLists, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const postsCollectionRef = collection(db, "posts");
            const postsQuery = category === "All" ? query(postsCollectionRef) : query(postsCollectionRef, where("category", "==", category));
            const postsSnapshot = await getDocs(postsQuery);
            const postsData = postsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPostList(postsData);
            setIsLoading(false);
        };
        fetchPosts();
    }, [category]);

    const categories = ["All", "Philosophy", "Nature", "Politics", "Anime"];

    return (
        <Blog
            navOpen={navOpen}
            toggleTheme={toggleTheme}
            isLoading={isLoading}
            postLists={postLists} 
            categories={categories}
            selectedCategory={category} 
        />
    );
};

export default FilteredCategories;
