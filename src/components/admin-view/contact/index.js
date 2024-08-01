'use client'
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormControls from "../form-controls";

const controls = [
  {
    name : 'heading',
    placeholder : 'Enter Contact heading',
    type : 'text',
    label : 'Enter Contact heading',
  },
  {
    name : 'summary',
    placeholder : 'Enter Contact summary',
    type : 'text',
    label : 'Enter Contact summary',
  },
];

function AdminContactView({formData, setFormData, handleSaveData}) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin Contact View</h1>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row>
        <Col>
          <FormControls 
            controls={controls}
            formData={formData}
            setFormData={setFormData}
          />
          <Button onClick={() => handleSaveData('contact')} variant="secondary">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminContactView;