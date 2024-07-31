'use client'
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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

function AdminContactView({formData, setFormData}) {
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
        </Col>
      </Row>
    </Container>
  );
}

export default AdminContactView;