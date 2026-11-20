import React from "react";
import { Button } from "react-bootstrap";
import Icon from "./Icon";

function Buttons({ buttons = [] }) {
  return (
    <div className="button-container">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="primary"
          href={button.href}
          target="_blank"
        >
          <Icon name={button.icon} />{' '}{button.label}
        </Button>
      ))}
    </div>
  );
}

export default Buttons;
