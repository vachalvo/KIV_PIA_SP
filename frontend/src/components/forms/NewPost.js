import 'bootstrap/dist/css/bootstrap.css';
import { Card, Form, Button } from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

const baseURL = 'http://localhost:8080'

function NewPost() {
    const cardStyle = {
        margin: "50px"
    }
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');

    const _onClick = async (e) => {
        const post = {
            header,
            content,
            dateTimeOfPublished: new Date().toISOString()
        };
        axios.post(baseURL + '/posts/create', post).then((response) => {
            setHeader('');
            setContent('');
            console.log("success", response);
        });
    }

    return (
        <div>
            <Card style={cardStyle} border={'dark'}>
                <Card.Header as="h5">What is going on in your head...?</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Header..." onChange={(event) => setHeader(event.target.value)} value={header}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content of post</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(event) => setContent(event.target.value)} value={content}/>
                        </Form.Group>
                        <Button onClick={_onClick} variant="primary">Submit</Button>{' '}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default NewPost;
