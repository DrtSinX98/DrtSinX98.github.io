import React from "react";
import { Button } from "react-bootstrap";

function Buttons() {
  return (
    <div className="button-container">
      <Button
        variant="primary"
        href="https://github.com/DrtSinX98"
        target="_blank"
      >
        GitHub
      </Button>
      <Button
        variant="primary"
        href="https://twitter.com/rjpritish"
        target="_blank"
      >
        Twitter
      </Button>
      <Button
        variant="primary"
        href="https://linkedin.com/in/pritish-joshi-b870bb242"
        target="_blank"
      >
        LinkedIn
      </Button>
      <style>
        {`
          .button-container {
            display: flex;
            justify-content: left;
            margin-top: 20px;
          }

          .btn-primary {
            color: #fafafa;
            background-color: #301934;
          }

          .btn-primary:hover {
            color: #fff;
            background-color: #c91574;
            cursor: pointer;
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