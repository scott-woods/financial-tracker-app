import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate()

    const goToHomepageClicked = () => {
        navigate("/", {replace:true})
    }

    return (
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
            <Stack spacing={2}>
                <Typography variant="h1" fontWeight="bold" letterSpacing={10} textAlign="center">
                    404
                </Typography>
                <Typography variant="h2" textAlign="center">
                    Page Not Found
                </Typography>
                <Typography variant="body1" textAlign="center">
                    The page you are looking for does not exist.
                </Typography>
                <Typography variant="body1" textAlign="center">
                    <a href="#" onClick={goToHomepageClicked}>Go to Homepage</a>
                </Typography>
            </Stack>
        </Box>
    )
}

export default NotFound;