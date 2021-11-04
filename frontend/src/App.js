import 'bootstrap/dist/css/bootstrap.css';
import Home from "./components/Home";

const background = {
    background: "linear-gradient(90deg, rgba(68,68,68,1) 10%, rgba(13,110,253,1) 90%)"
}

function App() {
    return (
        <div style={background}>
            <Home />
        </div>
    );
}

export default App;
