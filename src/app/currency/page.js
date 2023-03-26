'use client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Page() {
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        console.log(form);
        event.preventDefault();
      };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>From</Form.Label>
                    <Form.Control required type="text" placeholder="From Currency" />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>To</Form.Label>
                    <Form.Control required type="text" placeholder="To Currency" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Amount</Form.Label>
                    <Form.Control required type="number" placeholder="Amount" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Row>
        </Form>
    );
}