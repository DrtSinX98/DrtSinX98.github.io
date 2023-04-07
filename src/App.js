import React from "react"
import { Container } from "react-bootstrap";
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Header, { useActiveState } from "./components/Header"

function App() {
    const { active, handleSelect } = useActiveState();
    return (
        <div>
            <Header active={active} handleSelect={handleSelect} />
            <Container>
            {active === 'home' && <Home />}
            {active === 'about' && <About />}
            {active === 'projects' && <Projects />}
            {active === 'contact' && <Contact />}
            </Container>
        </div>
    )
}

export default App