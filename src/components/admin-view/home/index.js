'use client'
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormControls from "../form-controls";

const controls = [
  {
    name : 'heading',
    placeholder : 'Enter heading text',
    type : 'text',
    label : 'Enter heading text',
  },
  {
    name : 'summary',
    placeholder : 'Enter summary text',
    type : 'text',
    label : 'Enter summary text',
  },
];

function AdminHomeView({formData, setFormData}) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin Home View</h1>
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

export default AdminHomeView;