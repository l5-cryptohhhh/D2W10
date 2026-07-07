import { useState } from 'react';
import { Form as BForm, Button } from 'react-bootstrap';

function Form({ onSubmit }) {
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit(comment, Number(rate));
    setComment('');
    setRate(1);
  };

  return (
    <BForm onSubmit={handleSubmit} className="mb-3">
      <BForm.Group className="mb-2">
        <BForm.Label>Comment Text</BForm.Label>
        <BForm.Control
          as="textarea"
          placeholder="Add comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </BForm.Group>
      <BForm.Group className="mb-2">
        <BForm.Label>Rating</BForm.Label>
        <BForm.Control
          type="number"
          min={1}
          max={5}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </BForm.Group>
      <Button type="submit">Submit</Button>
    </BForm>
  );
}

export default Form;
