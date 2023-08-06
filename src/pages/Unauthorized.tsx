import { useAuth0 } from "@auth0/auth0-react"
import { Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"

const Unauthorized = () => {

    const { loginWithRedirect } = useAuth0()

    const goToLoginClicked = () => {
        loginWithRedirect()
    }

    return (
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
            <Stack spacing={2}>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    Unauthorized
                </Typography>
                <Typography variant="body1" textAlign="center">
                    <a href="#" onClick={goToLoginClicked}>Go to Login</a>
                </Typography>
            </Stack>
        </Box>
    )
}

export default Unauthorized