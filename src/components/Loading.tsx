import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Loading = () => {
    return (
        <Box display="flex" height="100%" justifyContent="center" alignItems="center">
            <Stack display="flex" justifyContent="center">
                <Box display="flex" justifyContent="center">
                    <CircularProgress size={70} />
                </Box>
                <Typography align="center">
                    Loading...
                </Typography>
            </Stack>
        </Box>
    )
}

export default Loading;