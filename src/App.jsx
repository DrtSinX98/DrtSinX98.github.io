import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Header, { useActiveState } from "./components/Header";
import Footer from "./components/Footer";
import ParticlesBG from "./components/ParticlesBg";

function App() {
  const { active, handleSelect } = useActiveState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imgs = [
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/cyan.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/twrp.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/kern.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/rui.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/concetto.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/stag.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/kj.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/mexb.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/erec.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/pfp.jpg',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/ab.svg',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/pr.svg',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/ct.svg',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/grad.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/work.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/cert.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/code.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/hobby.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/res.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/pub.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/teach.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/social.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/soft.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/test.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/thesis.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/edu.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/int.png',
      'https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/wor.png'
    ];

    cacheImages(imgs);
  }, []);

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });

    try {
      await Promise.all(promises);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load images", error);
    }
  };

  return (
    <div>
      <ParticlesBG/>
      <Header active={active} handleSelect={handleSelect} />
      {isLoading ? (
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
      <Footer/>
    </div>
  );
}

export default App;
