import React from "react";
import {
    Navbar,
    Nav,
    FormControl,
    Button,
    Container,
    Form,
} from "react-bootstrap";
import { isUserAuthenticated } from "apis/common";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
    const history = useHistory();
    const handleLogout = () => {
        if (isUserAuthenticated() != null) {
            const cookies = new Cookies();
            cookies.remove("token");
            history.push("/login");
        }
};

    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Home Service</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>

                        {isUserAuthenticated() && (
                            <Nav.Link href="/appointments">
                                Appointments
                            </Nav.Link>
                        )}
                        <Nav.Link href="/login" onClick={handleLogout}>
                            {isUserAuthenticated() ? "Sign out" : "Sign in"}
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
