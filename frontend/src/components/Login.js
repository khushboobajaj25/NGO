import React from "react";
import BaseForm from "components/BaseForm";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { userLoginAPI } from "apis/accounts";
import Loader from "components/Loader";
import { Link } from "react-router-dom";

function Login() {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.email.value;
        const password = e.target.password.value;
        setLoading(true);
        try {
            const response = await userLoginAPI(username, password);
            const cookies = new Cookies();
            cookies.set("token", response.data.token);
            history.push("/");
        } catch (error) {
            setAlert({
                type: "danger",
                message: "Invalid username or password",
            });
        }
        setLoading(false);
    };
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <BaseForm
                    title="Login"
                    handleSubmit={handleSubmit}
                    alert={alert}
                >
                    <p>
                        Don't have account ?
                        <Link to="/register"> Register</Link>
                    </p>
                </BaseForm>
            )}
        </div>
    );
}

export default Login;
