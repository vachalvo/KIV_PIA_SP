import 'bootstrap/dist/css/bootstrap.css';
import NewPost from "./forms/NewPost";
import PostList from "./posts/PostsList";
import {useEffect, useRef} from "react";
import PostService from "../services/post-service";

function Feed() {
    const postsList = useRef();

    useEffect(() => {
        function handleScroll() {
            const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

            if (bottom) {
                postsList.current.getData();
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [postsList]);

    return (
        <>
            <NewPost />
            <PostList ref={postsList} findAll={PostService.findAll} disableRefresh={false} />
        </>
    );
}

export default Feed;
