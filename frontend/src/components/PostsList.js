import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from "react";
import PostCard from "./PostCard";
import PostService from "../services/post-service";

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
