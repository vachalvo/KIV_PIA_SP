import 'bootstrap/dist/css/bootstrap.css';
import NewPost from "./forms/posts/NewPost";
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
                console.log('at the bottom');
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <NewPost />
            <PostList ref={postsList} findAll={PostService.findAll} disableRefresh={false}/>
        </>
    );
}

export default Feed;
