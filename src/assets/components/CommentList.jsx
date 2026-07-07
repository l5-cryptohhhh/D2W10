import { ListGroup, Button } from 'react-bootstrap';

function CommentList({ comments, onDelete }) {
  if (!comments.length) return <p className="text-muted">No reviews yet.</p>;

  return (
    <ListGroup className="mb-3">
      {comments.map((c) => (
        <ListGroup.Item
          key={c._id}
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            {c.comment} <small className="text-muted">(rate: {c.rate})</small>
          </span>
          <Button variant="danger" size="sm" onClick={() => onDelete(c._id)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CommentList;
