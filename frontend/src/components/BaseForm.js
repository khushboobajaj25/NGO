import React from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";

function BaseForm(props) {
    return (
        <Container
            className="mt-5"
            style={{ display: "flex", justifyContent: "center" }}
        >
            <div>
                <h1 className="text-primary text-center mb-3">{props.title}</h1>
                {props.alert.type && (
                    <Alert variant={props.alert.type}>
                        {props.alert.message}
                    </Alert>
                )}
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="email"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                    </Form.Group>
                    {props.children}
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default BaseForm;
