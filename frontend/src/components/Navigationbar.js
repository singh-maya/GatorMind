import {useAuthState} from "react-firebase-hooks/auth";
import { auth, logout } from "../services/firebase";
import {Link, navigate} from "react-router-dom";
import {Bell, CircleFill, Gear, HouseDoor, SearchHeart} from "react-bootstrap-icons";
import React from "react";
import {Nav, Navbar, NavLink} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const NavBar = () => {
    const [user, loading, error] = useAuthState(auth);
    console.log(useAuthState(auth))

    return (
        <div className="nav-container">
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="dark"><SearchHeart/></Button>
                    </Form>
                    <Nav className="ms-auto">
                        <Button size="lg" variant="none">
                            <NavLink eventKey="1" as={Link} to="/">
                                <HouseDoor/>
                            </NavLink>
                        </Button>
                        <Button size="lg" variant="none">
                            <NavLink eventKey="2" as={Link} to="/notifications">
                                <Bell/>
                            </NavLink>
                        </Button>
                        <Button size="lg" variant="none">
                            <NavLink eventKey="3" as={Link} to="/settings">
                                <Gear/>
                            </NavLink>
                        </Button>
                        <Button size="lg" variant="none">
                            <NavLink eventKey="4" as={Link} to="/profile">
                                <CircleFill/>
                            </NavLink>
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;