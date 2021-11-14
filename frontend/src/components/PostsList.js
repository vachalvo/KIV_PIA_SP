import 'bootstrap/dist/css/bootstrap.css';
import { } from "react-bootstrap";
import {useEffect, useState} from "react";
import PostCard from "./PostCard";
import PostService from "../services/post-service";

const usePagination = {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    siblingCount: 1
}
function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        PostService.findAll().then((response) => {
            setPosts(response.data.posts);
        });
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
