import React from "react";
import BaseForm from "components/BaseForm";
import Loader from "components/Loader";
import { Link, useHistory } from "react-router-dom";
import { userRegisterAPI } from "apis/accounts";

function Register() {
    const history = useHistory();
    const [alert, setAlert] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.email.value;
        const password = e.target.password.value;
        setLoading(true);
        try {
            await userRegisterAPI(username, password);
            history.push("/login");
        } catch (error) {
            setAlert({
                type: "danger",
                message: "Account with username already exists",
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
                    title="Register"
                    handleSubmit={handleSubmit}
                    alert={alert}
                >
                    <p>
                        Already have account ?
                        <Link to="/login"> Login </Link>
                    </p>
                </BaseForm>
            )}
        </div>
    );
}

export default Register;
