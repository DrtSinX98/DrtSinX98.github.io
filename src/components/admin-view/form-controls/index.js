'use client';
import React from "react";
import { Form, Button } from "react-bootstrap";

export default function FormControls({ controls, formData, setFormData }) {
  return (
    <Form>
      {controls.map((controlItem, index) => (
        <Form.Group className="mb-4" key={index}>
          <Form.Label>{controlItem.label}</Form.Label>
          <Form.Control 
            type={controlItem.type} 
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            id={controlItem.name}
            value={formData[controlItem.name] || ''}
            onChange={(e) => {
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value
              });
            }}
          />
        </Form.Group>
      ))}
      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
