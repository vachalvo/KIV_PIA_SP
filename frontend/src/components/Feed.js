import 'bootstrap/dist/css/bootstrap.css';
import NewPost from "./forms/NewPost";
import PostList from "./PostsList";

function Feed() {
    return (
        <>
            <NewPost/>
            <PostList/>
        </>
    );
}

export default Feed;
