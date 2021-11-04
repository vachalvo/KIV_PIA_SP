import 'bootstrap/dist/css/bootstrap.css';
import NewPost from "./NewPost";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import PostList from "./PostsList";

function Home() {
    return (
        <>
            <AppHeader />
            <NewPost />
            <PostList />
            <AppFooter />
        </>
    );
}

export default Home;
