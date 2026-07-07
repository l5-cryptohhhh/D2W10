import { useState } from 'react';
import { Row, Col, Card, Form as SearchForm } from 'react-bootstrap';
import books from '../data/fantasy.json';

function ListBooks({ selectedAsin, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Row className="mb-4">
        <Col xs={12}>
          <SearchForm.Label>Search a book</SearchForm.Label>
          <SearchForm.Control
            type="search"
            placeholder="Search here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="align-items-start">
        {filtered.map((book) => (
          <Col xs={12} sm={6} md={4} key={book.asin} className="mb-4">
            <Card
              role="button"
              onClick={() => onSelect(book.asin)}
              className={`book-card ${selectedAsin === book.asin ? 'selected' : ''}`}
            >
              <Card.Img variant="top" src={book.img} />
              <Card.Body className="px-0">
                <Card.Text>{book.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ListBooks;
