import { CookiesProvider } from 'react-cookie';
import {Component} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Home from "./Home";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'light'
        };
    }

    toggleDarkMode() {
        const newMode = this.state.mode === 'light' ? 'dark' : 'light';
        this.setState({
            ...this.state,
            mode: newMode
        });
    }

    render() {
        let theme = createTheme({
            palette: {
                mode: this.state.mode
            }
        });

        return (
            <CookiesProvider>
                <ThemeProvider theme={theme}>
                    <Home
                        mode={this.state.mode}
                        onChangeMode={this.toggleDarkMode.bind(this)}
                    />
                </ThemeProvider>
            </CookiesProvider>
        );
    }
}

export default App;