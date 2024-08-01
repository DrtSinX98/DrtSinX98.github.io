'use client'
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormControls from "../form-controls";

const controls = [
  {
    name : 'heading',
    placeholder : 'Enter Projects heading',
    type : 'text',
    label : 'Enter Projects heading',
  },
  {
    name : 'summary',
    placeholder : 'Enter Projects summary',
    type : 'text',
    label : 'Enter Projects summary',
  },
];

function AdminProjectsView({formData, setFormData, handleSaveData}) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin Projects View</h1>
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
          <Button onClick={() => handleSaveData('projects')} variant="secondary">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminProjectsView;