import React from "react";
import { Container, Spinner } from "react-bootstrap";

function Loader() {
    return (
        <Container className="mt-5 text-center">
            <Spinner animation="border" className="bg-primary text-light"/>
        </Container>
    );
}

export default Loader;
