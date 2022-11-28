import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const AppNavBar = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Navbar variant= "light" className="color-nav" expand="lg">
<Container fluid>

    <Navbar.Brand as={Link} to="/">
        <img src= "/logo-no-background.png" width="64"/>
        &nbsp; <span className="site-title"> The Goodness Gift </span>        
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar"/>
    <Navbar.Collapse id="navbar">
        <Nav className="ml-auto">
            {Auth.loggedIn() ? (
                <>
                <Nav.Link as={Link} className="nav-text" to="/created">
                    My Fundraisers
                </Nav.Link>
                <Nav.Link className="nav-text" onClick={Auth.logout}>
                    Logout
                </Nav.Link>
                </>
            ): (
                <Nav.Link className="nav-text" onClick={() => setShowModal(true)}>
                    Login/Sign Up
                </Nav.Link>
            )}
    </Nav>
    </Navbar.Collapse>
</Container>
</Navbar>

<Modal
size="lg"
show={showModal}
onHide={() => setShowModal(false)}
aria-labelledby="signup-modal">
<Tab.Container defaultActiveKey="login">
    <Modal.Header closeButton>
<Modal.Title id="signup-modal">
    <Nav variant="pills">
        <Nav.Item>
            <Nav.Link eventKey="login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="signup">Sign Up</Nav.Link>
        </Nav.Item>
    </Nav>
</Modal.Title>
    </Modal.Header>
<Modal.Body>
    <Tab.Content>
<Tab.Pane eventKey="login">
    <LoginForm handleModalClose={ () => setShowModal (false)}/>
</Tab.Pane>
<Tab.Pane eventKey="signup">
    <SignupForm handleModalClose={ () => setShowModal (false)}/>
</Tab.Pane>
</Tab.Content>
</Modal.Body>
</Tab.Container>
</Modal>
        </>
    );
};

export default AppNavBar;



