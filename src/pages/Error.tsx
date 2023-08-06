import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom"

const Error = () => {

    const error = useRouteError()
    const navigate = useNavigate()

    const goToHomepageClicked = () => {
        navigate("/", {replace:true})
    }

    return (
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
            <Stack spacing={2}>
                <Typography variant="h2">
                    Something went wrong.
                </Typography>
                <Typography variant="body1" textAlign="center">
                    An unexpected error has occurred: <span style={{fontWeight:"bold"}}>{
                        isRouteErrorResponse(error) ?
                            (
                                error.error?.message || error.statusText
                            ) :
                            "Unknown Error"
                    }</span>
                </Typography>
                <Typography variant="body1" textAlign="center">
                    <a href="#" onClick={goToHomepageClicked}>Return to Homepage</a>
                </Typography>
            </Stack>
        </Box>
    )
}

export default Error