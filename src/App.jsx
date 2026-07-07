import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import ListBooks from './assets/components/ListBooks.jsx';
import CommentList from './assets/components/CommentList.jsx';
import Form from './assets/components/Form.jsx';
import './App.css';

const API_URL = 'https://striveschool-api.herokuapp.com/api/comments';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NmE2ZGE0NjE0NDAwMTVlMDVkMDMiLCJpYXQiOjE3ODI5OTk2NjEsImV4cCI6MTc4NDIwOTI2MX0.CbhiLuccMnCzgk0kL-TUCdBhxSzPguaLq3Fq0xYeaNE';

function App() {
  const [selectedAsin, setSelectedAsin] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!selectedAsin) return;
    fetch(`${API_URL}/${selectedAsin}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then(setComments);
  }, [selectedAsin]);

  const selectBook = (asin) => {
    setSelectedAsin((prev) => (prev === asin ? null : asin));
  };

  const addComment = (comment, rate) => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ comment, rate, elementId: selectedAsin }),
    })
      .then((res) => res.json())
      .then((newComment) => setComments((prev) => [...prev, newComment]));
  };

  const deleteComment = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
    }).then(() => setComments((prev) => prev.filter((c) => c._id !== id)));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">EpiBooks</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto" activeKey="shop">
              <Nav.Link href="#" eventKey="shop">Shop</Nav.Link>
              <Nav.Link href="#" eventKey="about">About</Nav.Link>
              <Nav.Link href="#" eventKey="browse">Browse</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        <div className="bg-light text-center py-5 rounded">
          <h1>Welcome to EpiBooks!</h1>
          <p className="text-muted mb-0">We list books</p>
        </div>
      </Container>

      <Container>
        <Row>
          <Col xs={12} md={selectedAsin ? 8 : 12}>
            <ListBooks selectedAsin={selectedAsin} onSelect={selectBook} />
          </Col>
          {selectedAsin && (
            <Col xs={12} md={4}>
              <Form onSubmit={addComment} />
              <CommentList comments={comments} onDelete={deleteComment} />
            </Col>
          )}
        </Row>
      </Container>

      <footer className="bg-dark text-light text-center py-2 mt-4">
        <small>EPICODE - Copyright 2026</small>
      </footer>
    </>
  );
}

export default App;
