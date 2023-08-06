import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoggedOut = () => {

    const { loginWithRedirect } = useAuth0()

    const goToLoginClicked = () => {
        loginWithRedirect()
    }

    return (
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
            <Stack spacing={2}>
                <Typography variant="h4" textAlign="center">
                    You have Successfully Logged Out
                </Typography>
                <Typography variant="body1" textAlign="center">
                    <a href="#" onClick={goToLoginClicked}>Return to Login</a>
                </Typography>
            </Stack>
        </Box>
    )
}

export default LoggedOut;