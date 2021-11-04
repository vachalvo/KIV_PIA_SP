import 'bootstrap/dist/css/bootstrap.css';
import {Button, Card, Row, Col} from "react-bootstrap";

function PostCard(props) {
    const {post} = props;

    const cardStyle = {
        margin: "20px 50px"
    }

    const header = post.header;
    const timestamp = post.dateTimeOfPublished;
    const content = post.content;
    const author = "TODO";

    return (
        <div>
            <Card style={cardStyle} border={'dark'}>
                <Card.Header as="h5">
                    <Row>
                        <Col>
                            {header}
                        </Col>
                        <Col md="auto" style={{textAlign: "right"}}>
                            <Button onClick={() => console.log("delete")} variant="primary">Edit</Button>{' '}
                            <Button onClick={() => console.log("update")} variant="danger">Delete</Button>{' '}
                        </Col>
                    </Row>
                    </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}{content}{' '}
                        </p>
                        <footer className="blockquote-footer">
                            {author}
                        </footer>
                    </blockquote>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Card.Text style={{"text-align": "right"}}>{timestamp}</Card.Text>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default PostCard;
