import React from "react";
import { Col, Image , Container, Row, Card, ListGroup, Button, Tab } from "react-bootstrap";

function Lectures() {
    return (
        <Container>
            <Row>
                <Col lg={4} className="image-p">
                    <div id="lc-img">
                    <Image src="https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/lc.svg" alt="about-pic" className="mb-4" fluid/>
                    </div>
                </Col>
                <Col>
                    <h1>Enjoy the <span className="pink">Lectures!</span></h1>
                    <p className="lead">I am planning to prepare a <span className="pink">lecture </span>series on 
                        <br/><span className="pink">Computational </span>Physics, Chemistry, and Biology.
                        <br/>Below you can look into the <span className="pink">topics </span>that will be covered in this series.
                        <br/>Links will be updated as soon as the videos are ready <span className="pink">(weekly)</span>.
                    </p>
                </Col>
            </Row>
            <hr className="my-4" />
            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Header>Module 1</Card.Header>
                        <Card.Body>
                            <Card.Title>The Fundamentals</Card.Title>
                        </Card.Body>
                        <Tab.Container id="list-group-one" defaultActiveKey="#link1-1">
                            <Row>
                                <Col xs={6}>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" action href="#link1-1">
                                        Mathematics: Fundamentals - I
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link1-2">
                                        Mathematics: Fundamentals - II
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link1-3">
                                        Statistics: Fundamentals - I
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link1-4">
                                        Statistics: Fundamentals - II
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link1-5">
                                        Proteins & Membrane structure
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link1-6">
                                        Solid state physics
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col xs={6}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="#link1-1">
                                        <ListGroup>
                                                <ListGroup.Item>Functions</ListGroup.Item>
                                                <ListGroup.Item>Calculus</ListGroup.Item>
                                                <ListGroup.Item>Vectors</ListGroup.Item>
                                                <ListGroup.Item>Linear algebra</ListGroup.Item>
                                                <ListGroup.Item>Matrices</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link1-2">
                                            <ListGroup>
                                                <ListGroup.Item>Commplex numbers</ListGroup.Item>
                                                <ListGroup.Item>Vector calculus</ListGroup.Item>
                                                <ListGroup.Item>Series expansion</ListGroup.Item>
                                                <ListGroup.Item>Operator algebra</ListGroup.Item>
                                                <ListGroup.Item>Bra-Ket notations</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link1-3">
                                            <ListGroup>
                                                <ListGroup.Item>Types of statistics</ListGroup.Item>
                                                <ListGroup.Item>Understanding data</ListGroup.Item>
                                                <ListGroup.Item>Population vs. samples</ListGroup.Item>
                                                <ListGroup.Item>Data distributions</ListGroup.Item>
                                                <ListGroup.Item>Central tendencies</ListGroup.Item>
                                                <ListGroup.Item>The Gaussian distribution</ListGroup.Item>
                                                <ListGroup.Item>Measure of dispersion</ListGroup.Item>
                                                <ListGroup.Item>Measure of shape</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link1-4">
                                            <ListGroup>
                                                <ListGroup.Item>Statistical distances</ListGroup.Item>
                                                <ListGroup.Item>Outliers</ListGroup.Item>
                                                <ListGroup.Item>Principal Component Analysis</ListGroup.Item>
                                                <ListGroup.Item>Probability theory</ListGroup.Item>
                                                <ListGroup.Item>Hypothesis testing</ListGroup.Item>
                                                <ListGroup.Item>ANOVA</ListGroup.Item>
                                                <ListGroup.Item>Chi-square test</ListGroup.Item>
                                                <ListGroup.Item>Bayesian statistics</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link1-5">
                                            <ListGroup>
                                                <ListGroup.Item>Amino acids</ListGroup.Item>
                                                <ListGroup.Item>peptide linkages</ListGroup.Item>
                                                <ListGroup.Item>primary, secondary and tertiary structures</ListGroup.Item>
                                                <ListGroup.Item>Interaction of proteins and ligands</ListGroup.Item>
                                                <ListGroup.Item>lipids and membranes</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link1-6">
                                            <ListGroup>
                                                <ListGroup.Item>Crystal systems and Lattices</ListGroup.Item>
                                                <ListGroup.Item>Point groups and space groups</ListGroup.Item>
                                                <ListGroup.Item>Unit cell</ListGroup.Item>
                                                <ListGroup.Item>Super cell</ListGroup.Item>
                                                <ListGroup.Item>wigner - Seitz cell</ListGroup.Item>
                                                <ListGroup.Item>Reciprocal space</ListGroup.Item>
                                                <ListGroup.Item>k-points and Brillouin zone</ListGroup.Item>
                                                <ListGroup.Item>X-Ray diffraction: Bragg's law and Laue's law</ListGroup.Item>
                                                <ListGroup.Item>Defects in crystals</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Header>Module 2</Card.Header>
                        <Card.Body>
                            <Card.Title>Classical Molecular Dynamics</Card.Title>
                        </Card.Body>
                        <Tab.Container id="list-group-two" defaultActiveKey="#link2-1">
                            <Row>
                                <Col xs={6}>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" action href="#link2-1">
                                        Introduction to Classical Mechanics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-2">
                                        Newtonian Mechanics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-3">
                                        Lagrangian Mechanics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-4">
                                        Hamiltonian Mechanics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-5">
                                        Equilibrium Statistical Mechanics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-6">
                                        Non-Equilibrium Statistical Mechanics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-7">
                                        Classical Molecular Dynamics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-8">
                                        Classical Force Fields
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-9">
                                        Free Energy Calculations & sampling Methods
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-10">
                                        Entropy corrections
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-11">
                                        Minimum Energy Paths of Transition
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-12">
                                        QM/MM methods
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-13">
                                        Hands on CMD soft matter
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2-14">
                                        Hands on CMD hard matter
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col xs={6}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="#link2-1">
                                        <ListGroup>
                                                <ListGroup.Item>The classical regime</ListGroup.Item>
                                                <ListGroup.Item>Mass and velocity</ListGroup.Item>
                                                <ListGroup.Item>Formalisms of classical mechanics</ListGroup.Item>
                                                <ListGroup.Item>Applicability</ListGroup.Item>
                                                <ListGroup.Item>Limitations</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-2">
                                        <ListGroup>
                                                <ListGroup.Item>Degrees of freedom</ListGroup.Item>
                                                <ListGroup.Item>1D motion of a single particle</ListGroup.Item>
                                                <ListGroup.Item>Phase space and phase portrait</ListGroup.Item>
                                                <ListGroup.Item>Dynamics in phase space</ListGroup.Item>
                                                <ListGroup.Item>Linear dynamical systems</ListGroup.Item>
                                                <ListGroup.Item>Autonomous dynamical systems</ListGroup.Item>
                                                <ListGroup.Item>Conservative vs. dissipated systems</ListGroup.Item>
                                                <ListGroup.Item>Limitations of Newtonian formalism</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-3">
                                        <ListGroup>
                                                <ListGroup.Item>Action principles</ListGroup.Item>
                                                <ListGroup.Item>The Lagrangian</ListGroup.Item>
                                                <ListGroup.Item>Newtonian to Lagrangian</ListGroup.Item>
                                                <ListGroup.Item>Advantages and Limitations</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-4">
                                            <ListGroup>
                                                <ListGroup.Item>Legendre transformations</ListGroup.Item>
                                                <ListGroup.Item>Lagrangian to Hamiltonian</ListGroup.Item>
                                                <ListGroup.Item>Hamilton's equation</ListGroup.Item>
                                                <ListGroup.Item>Constants of motion</ListGroup.Item>
                                                <ListGroup.Item>Poisson's brackets</ListGroup.Item>
                                                <ListGroup.Item>Hamiltonian for a general dynamical system</ListGroup.Item>
                                                <ListGroup.Item>Free mmotion of a particle on a line</ListGroup.Item>
                                                <ListGroup.Item>Solving a Hamiltonian</ListGroup.Item>
                                                <ListGroup.Item>Canonical transformations</ListGroup.Item>
                                                <ListGroup.Item>Origin of dynamical chaos</ListGroup.Item>
                                                <ListGroup.Item>Ergodicity</ListGroup.Item>
                                                <ListGroup.Item>Noether's Theorem</ListGroup.Item>
                                                <ListGroup.Item>Dynamical symmetry groups</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-5">
                                            <ListGroup>
                                                <ListGroup.Item>Introduction</ListGroup.Item>
                                                <ListGroup.Item>Probability Distributions</ListGroup.Item>
                                                <ListGroup.Item>Ensembles</ListGroup.Item>
                                                <ListGroup.Item>Thermodynamics & Statistical Mechanics Relation</ListGroup.Item>
                                                <ListGroup.Item>Phase Transitions</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-6">
                                            <ListGroup>
                                                <ListGroup.Item>The Langevin Model</ListGroup.Item>
                                                <ListGroup.Item>Linear Response Theory</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-7">
                                            <ListGroup>
                                                <ListGroup.Item>Applicability</ListGroup.Item>
                                                <ListGroup.Item>Short & Long range interactions</ListGroup.Item>
                                                <ListGroup.Item>Integrators</ListGroup.Item>
                                                <ListGroup.Item>Thermodynamic Ensembles</ListGroup.Item>
                                                <ListGroup.Item>Thermostats and Barostats</ListGroup.Item>
                                                <ListGroup.Item>Boundary Conditions</ListGroup.Item>
                                                <ListGroup.Item>Parallel MD</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-8">
                                            <ListGroup>
                                                <ListGroup.Item>Structure of a Force Field</ListGroup.Item>
                                                <ListGroup.Item>Intramolecular Terms</ListGroup.Item>
                                                <ListGroup.Item>Intermolecular Terms</ListGroup.Item>
                                                <ListGroup.Item>Special Terms</ListGroup.Item>
                                                <ListGroup.Item>Popular Force Fields</ListGroup.Item>
                                                <ListGroup.Item>Parametrizing a Force Field</ListGroup.Item>
                                                <ListGroup.Item>Beyond empirical Force Field</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-9">
                                            <ListGroup>
                                                <ListGroup.Item>Solvation/Transfer Free Energy</ListGroup.Item>
                                                <ListGroup.Item>Binding Free Energy</ListGroup.Item>
                                                <ListGroup.Item>Conformational Free Energy</ListGroup.Item>
                                                <ListGroup.Item>Calculation of Free Energy</ListGroup.Item>
                                                <ListGroup.Item>Brute Force Method</ListGroup.Item>
                                                <ListGroup.Item>Thermodynamical Integration</ListGroup.Item>
                                                <ListGroup.Item>Free Energy Perturbation</ListGroup.Item>
                                                <ListGroup.Item>Umbrella Sampling</ListGroup.Item>
                                                <ListGroup.Item>Potential of Mean Force</ListGroup.Item>
                                                <ListGroup.Item>Steered Molecular Dynamics</ListGroup.Item>
                                                <ListGroup.Item>Adaptive Biased Force</ListGroup.Item>
                                                <ListGroup.Item>Replica Exchange/Parallel Tempering</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-10">
                                            <ListGroup>
                                                <ListGroup.Item>Harmonic and Quasi-harmonic techniques</ListGroup.Item>
                                                <ListGroup.Item>Step-by-step reconstruction</ListGroup.Item>
                                                <ListGroup.Item>Normal Mode Analysis</ListGroup.Item>
                                                <ListGroup.Item>Interaction Entropy</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-11">
                                            <ListGroup>
                                                <ListGroup.Item>Chain-of-states/Plain Elastic Bands</ListGroup.Item>
                                                <ListGroup.Item>Nudge Elastic Bands</ListGroup.Item>
                                                <ListGroup.Item>Implementation of NEB</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2-12">
                                            <ListGroup>
                                                <ListGroup.Item>Hybrid QM/MM Methods</ListGroup.Item>
                                                <ListGroup.Item>Subtractive QM/MM Methods</ListGroup.Item>
                                                <ListGroup.Item>Additive QM/MM Methods</ListGroup.Item>
                                                <ListGroup.Item>Capping bonds at QM/MM boundary</ListGroup.Item>
                                            </ListGroup>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Header>Module 3</Card.Header>
                        <Card.Body>
                            <Card.Title>ab initio Molecular Dynamics</Card.Title>
                        </Card.Body>
                        <Tab.Container id="list-group-three" defaultActiveKey="#link3-1">
                            <Row>
                                <Col>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" action href="#link3-1">
                                        Introduction to Quantum Mechanics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-2">
                                        Copenhagen vs. Bohemian interpretations
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-3">
                                        Schrödinger, Heisenberg, and Dirac formalisms
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-4">
                                        Approximation Methods
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-5">
                                        Wave function based methods (Hartree-Fock method and beyond)
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-6">
                                        Density based methods (Density Functional Theory and beyond)
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-7">
                                        ab initio Molecular Dynamics
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-8">
                                        Hand on AIMD: Structural relaxation
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-9">
                                        Hands on AIMD: Simulations of liquids and solids
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-10">
                                        Hand on AIMD: Slab models and Interfaces
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-11">
                                        Introduction to Electronic Structure Theory
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link3-12">
                                        Hands on Electronic Structure Calculations
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Header>Module 4</Card.Header>
                        <Card.Body>
                            <Card.Title>Python Programming</Card.Title>
                        </Card.Body>
                        <Tab.Container id="list-group-four" defaultActiveKey="#link4-1">
                            <Row>
                                <Col>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" action href="#link4-1">
                                            Introduction to Python programming language
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link4-2">
                                            Data types and variables
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link4-3">
                                            Conditionals
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link4-4">
                                            Loops
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link4-5">
                                            Hands on basic python programming
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link4-6">
                                            Python Libraries
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link4-7">
                                            Numpy, Pandas and Matplotlib
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link4-8">
                                            Hands on python programming with libraries
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Header>Module 5</Card.Header>
                        <Card.Body>
                            <Card.Title>Machine Learning</Card.Title>
                        </Card.Body>
                        <Tab.Container id="list-group-five" defaultActiveKey="#link5-1">
                            <Row>
                                <Col>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" action href="#link5-1">
                                            Introduction to Machine Learning
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-2">
                                            Regression problems
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-3">
                                            Classification Problems
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-4">
                                            Tree based models
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-5">
                                            Support Vector Machines
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-6">
                                            Bagging and Boosting techniques
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-7">
                                            Bayesian Statistics and Bayes’ Theorem: The Naïve Bayes Algorithm
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-8">
                                            Hands on ML: Regression
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-9">
                                            Hands on ML: Classification
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-10">
                                            Machine Learning in Physics, Chemistry and Biology
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link5-11">
                                            Machine Learning Force Fields
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Header>Module 6</Card.Header>
                        <Card.Body>
                            <Card.Title>Deep Learning</Card.Title>
                        </Card.Body>
                        <Tab.Container id="list-group-six" defaultActiveKey="#link6-1">
                            <Row>
                                <Col>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" action href="#link6-1">
                                            Introduction to Deep Learning
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-2">
                                            Artificial neurons
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-3">
                                            Activation function
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-4">
                                            Neural Networks
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-5">
                                            ANN, RNN, CNN and GNN
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-6">
                                            Image processing
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-7">
                                            Generative Adversarial Networks (GANs)
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-8">
                                            Variational Auto-Encoders (VAEs)
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link6-9">
                                            Neural Networks in Physics, Chemistry and Biology
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>


            <style>
                {`
                #lc-img {
                    width: 350px;
                    height: 350px;
                }
                
                h1 {
                    font-size: 50px;
                    font-weight: bold;
                }

                .lead {
                    font-size: 24px;
                    line-height: 1.5;
                }

                .pink {
                    color: var(--secondary-color);
                }

                .card {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                }

                .card-title {
                    color: var(--secondary-color);
                    font-size: 24px;
                    font-weight: bold;
                }

                .card-header {
                    color: var(--secondary-color);
                    font-size: 22px;
                    font-weight: bold;
                }
                
                .card-text {
                    font-size: 18px;
                    line-height: 1.5;
                }

                .list-group {
                    overflow: auto;
                }


                .list-group-item {
                    background-color: rgba(256, 256, 256, 0.0);
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .list-group-item:hover {
                    background-color: rgba(201 21 116 / 0.8);
                    color: white;
                }

                .list-group-item.active {
                    z-index: 0;
                    color: var(--tertiary-color);
                    background-color: var(--secondary-color);
                    border-color: rgb(222, 226, 230);
                }

                .list-group-item.active:hover {
                    background-color: var(--secondary-color);
                }

                .btn-secondary {
                    font-size: 18px;
                    padding: 6px 12px;
                    margin: 0;
                }

                @media (max-width: 767px) {
                    .image-p {
                    display: flex;
                    justify-content: center;
                    }
                }

                @media (max-width: 1107px) {
                    .card {
                    height: 610px;
                    }
                }
                `}
            </style>
        </Container>
    );
}

export default Lectures;