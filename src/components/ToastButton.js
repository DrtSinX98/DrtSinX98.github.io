import React, { useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";

function ToastButton() {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    return (
        <div>
            <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
                <Toast className="mb-2" show={showA} onClose={toggleShowA} delay={2500} autohide>
                <Toast.Header>
                    <strong className="me-auto">For More..</strong>
                </Toast.Header>
                <Toast.Body>Please visit "About" page. Thank You!</Toast.Body>
                </Toast>
            </ToastContainer>
            <Button onClick={toggleShowA} variant="secondary" size="sm">
                More..
            </Button>
            <style>
                {`
                .toast {
                    background-color: rgba(238 234 252 / 0.6);
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);
                    color: var(--primary-color);
                    font-weight: bold;
                }
                
                .toast-header {
                    background-color: rgba(48 25 52 / 0.9);
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);
                    color: var(--tertiary-color);
                }

                .btn-secondary {
                    font-size: 18px;
                    padding: 6px 12px;
                    margin: 0;
                }
                `}
            </style>
        </div>
    );
}

export default ToastButton;