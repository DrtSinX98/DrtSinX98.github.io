'use client'
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormControls from "../form-controls";

const controls = [
  {
    name : 'heading',
    placeholder : 'Enter About heading',
    type : 'text',
    label : 'Enter About heading',
  },
  {
    name : 'summary',
    placeholder : 'Enter About summary',
    type : 'text',
    label : 'Enter About summary',
  },
];

function AdminAboutView({formData, setFormData, handleSaveData}) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin About View</h1>
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
          <Button onClick={() => handleSaveData('about')} variant="secondary">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminAboutView;