import { Paper, Box, Typography, Stack } from "@mui/material";

const NetWorth = () => {
    return (
        <Paper elevation={12} sx={{padding:2, height:'100%'}}>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignContent="flex-start" height='100%'>
                <Typography width='100%' variant="h6">
                    Net Worth
                </Typography>
                <Typography>
                    $100,000
                </Typography>
            </Box>
        </Paper>
    )
}

export default NetWorth;