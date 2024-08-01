import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Buttons() {
  return (
    <div className="button-container">
      <Button
        variant="primary"
        href="https://github.com/DrtSinX98"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} />{' '}GitHub
      </Button>
      <Button
        variant="primary"
        href="https://scholar.google.com/citations?user=jUdY7OcAAAAJ&hl=en"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGoogleScholar} />{' '}Scholar
      </Button>
      <Button
        variant="primary"
        href="https://linkedin.com/in/pritish-joshi-b870bb242"
        target="_blank"
      >
        <FontAwesomeIcon icon={faLinkedin} />{' '}LinkedIn
      </Button>
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
