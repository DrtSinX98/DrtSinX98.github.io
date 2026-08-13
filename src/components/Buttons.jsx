import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIcon } from "@/lib/icons";

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
          <FontAwesomeIcon icon={getIcon(button.icon)} />{' '}{button.label}
        </Button>
      ))}
      <style>
        {`
          .button-container {
            display: flex;
            justify-content: left;
            margin-top: 20px;
          }

          @media (max-width: 767px) {
            .button-container {
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Buttons;
