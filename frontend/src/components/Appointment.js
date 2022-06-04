import React from "react";
import { Card, Container } from "react-bootstrap";
import Header from "./Header";
import Loader from "./Loader";
import { getAppointments } from "apis/services";
import { Link } from "react-router-dom";

function Appointment() {
    const [appointments, setAppointments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        document.title = "Appointment";
        const callAPI = async () => {
            const response = await getAppointments();
            console.log(response.data);
            setAppointments(response.data);
            setLoading(false);
        };
        callAPI();
    }, []);
    return (
        <div>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <Container className="mt-5">
                    {appointments.map((appointment, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Header
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>{appointment.type_of_service}</div>
                                <div>{appointment.rating}</div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{appointment.name}</Card.Title>
                                <Card.Text>{appointment.description}</Card.Text>
                                <Link to={`/services/${appointment.slug}`} className="btn btn-primary">
                                    View Service
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
            )}
        </div>
    );
}

export default Appointment;
