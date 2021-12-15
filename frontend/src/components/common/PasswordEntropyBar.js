import 'bootstrap/dist/css/bootstrap.css';
import {
    LinearProgress, Typography
} from "@mui/material";

const barStyle = {
    height: 8,
    borderRadius: 5
};

const BAR_PROPS = {
    short: {
        color: 'error',
        text: 'Too short',
        value: 0
    },
    weak: {
        color: 'error',
        text: 'Weak',
        value: 25
    },
    fair: {
        color: 'warning',
        text: 'Fair',
        value: 50
    },
    good: {
        color: 'info',
        text: 'Good',
        value: 75
    },
    strong: {
        color: 'success',
        text: 'Strong',
        value: 100
    }
};

const getBarProps = (score) => {
    if(score === 0){
        return BAR_PROPS.short;
    }
    else if(score < 25){
        return BAR_PROPS.weak;
    }
    else if(score < 50){
        return BAR_PROPS.fair;
    }
    else if(score < 75){
        return BAR_PROPS.good;
    }
    else {
        return BAR_PROPS.strong;
    }
};

function PasswordEntropyBar(props) {
    const passwordProps = getBarProps(props.score);

    return (
        <div style={{
            'textAlign': 'right'
        }}>
            <LinearProgress
                sx={{
                    ...barStyle,
                    backgroundColor: '#bdbdbd'
                }}
                variant="determinate"
                color={passwordProps.color}
                value={passwordProps.value}
            />
            <Typography variant="caption">{passwordProps.text}</Typography>
        </div>
    );
}

export default PasswordEntropyBar;
