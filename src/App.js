import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Header, { useActiveState } from "./components/Header";

function App() {
  const { active, handleSelect } = useActiveState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to fetch data
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      <Header active={active} handleSelect={handleSelect} />
      {loading ? (
        <div className="spinner-container">
          <Spinner className="spinner" />
        </div>
      ) : (
        <Container>
          {active === "home" && <Home />}
          {active === "about" && <About />}
          {active === "projects" && <Projects />}
          {active === "contact" && <Contact />}
        </Container>
      )}
    </div>
  );
}

export default App;
