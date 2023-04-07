import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, About, Contact, Projects } from './Main';
import Header from "./Header"

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/projects" element={<Projects/>} />
                    <Route path="/contact" element={<Contact/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App