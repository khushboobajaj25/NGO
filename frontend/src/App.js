import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";
import Appointment from "components/Appointment";
import ServiceDetails from "components/ServiceDetails";
import PrivateRoute from 'routes/PrivateRoute';
import AuthRoute from 'routes/AuthRoute';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                    <PrivateRoute exact path="/appointments" component={Appointment} />
                    <Route exact path="/service" component={ServiceDetails} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
