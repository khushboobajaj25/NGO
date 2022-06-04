import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getServices } from "apis/services";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import Loader from "./Loader";

function Home() {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState({});
    const history = useHistory();
    useEffect(() => {
        document.title = "Home";

        const callAPI = async () => {
            const response = await getServices();
            console.log(response);
            setServices(response.data);
            setLoading(false);
        };
        callAPI();
    }, []);
    const handleClick = (slug) => {
        history.push("/service/"+slug);
    };

    return (
        <div>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <Container className="mt-5">
                    <Row>
                        {services.map((service, index) => (
                            <Col key={index} lg={4} sm={6} xs={12}>
                                <Card
                                    style={{ width: "18rem" }}
                                    className="mt-3"
                                >
                                    <div
                                        style={{ width: 286, height: 180 }}
                                        className="border border-dark"
                                    >
                                        <Card.Img
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                            variant="top"
                                            src={service.image}
                                        />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{service.name}</Card.Title>
                                        <Card.Text>
                                            {service.description}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                handleClick(service.slug)
                                            }
                                        >
                                            View
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default Home;
