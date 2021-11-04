import 'bootstrap/dist/css/bootstrap.css';
import { } from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import PostCard from "./PostCard";

const baseURL = 'http://localhost:8080'

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
       const getPostList = async () => {
           const response = await axios.get(baseURL + '/posts/findAll');
           setPosts(response.data);
       };

       getPostList();
    }, []);

    const renderPosts = posts.map((post) => {
        return <PostCard post={post} />;
    })

    return (
        <div>
            {posts && renderPosts}
        </div>
    );
}

export default PostList;
