import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LoggedOut = () => {


    return (
        <div>
            <p>You have successfully logged out.</p>
            <Link to="/login" replace>Return to Login Page</Link>
        </div>
    )
}

export default LoggedOut;