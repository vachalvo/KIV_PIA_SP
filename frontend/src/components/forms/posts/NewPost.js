import 'bootstrap/dist/css/bootstrap.css';
import { Card, Form, Button } from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

const baseURL = 'http://localhost:8080'

function NewPost() {
    const cardStyle = {
        margin: "50px"
    }
    const [data, setData] = useState({
        header: '',
        content: ''
    });

    const _inputOnChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const _onClick = async (event) => {
        event.preventDefault();
        const post = {
            header: data.header,
            content: data.content,
            dateTimeOfPublished: new Date().toISOString()
        };
        axios.post(baseURL + '/posts/create', post).then((response) => {
            setData({
                header: '',
                content: ''
            })
            console.log("success", response);
        });
    }

    return (
        <div>
            <Card style={cardStyle} border={'dark'}>
                <Card.Header as="h5">What is going on inside your head...?</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Header..." onChange={_inputOnChange} value={data.header}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content of post</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={_inputOnChange} value={data.content}/>
                        </Form.Group>
                        <Button onClick={_onClick} variant="primary">Submit</Button>{' '}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default NewPost;
