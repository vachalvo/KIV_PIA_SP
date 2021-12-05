import 'bootstrap/dist/css/bootstrap.css';
import {Avatar} from "@mui/material";
import {FemaleOutlined, MaleOutlined} from "@mui/icons-material";
import {blue, pink} from "@mui/material/colors";

function GenderAvatar(props) {
    const {gender} = props;

    return (
        <Avatar sx={{ bgcolor: gender === 'MALE' ? blue[500] : pink[500] }}>
            {gender === 'MALE' ?
                <MaleOutlined /> : <FemaleOutlined />
            }
        </Avatar>
    );
}

export default GenderAvatar;
