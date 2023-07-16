import { Paper, Stack, Typography } from "@mui/material";

const IncomeAndExpensesOverview = () => {
    return (
        <Paper elevation={6} sx={{display:'flex', justifyContent: 'space-around', padding:2}}>
            <Stack spacing={1}>
                <Typography variant="subtitle1" sx={{textAlign:'left', fontWeight:'light'}}>
                    Your liquid income is...
                </Typography>
                <Typography variant="h4" sx={{textAlign:'center', fontWeight:'bold'}}>
                    $7083.98
                </Typography>
                <Typography variant="subtitle1" sx={{textAlign:'right', fontWeight:'light'}}>
                    per month
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="subtitle1" sx={{textAlign:'left', fontWeight:'light'}}>
                    You are investing...
                </Typography>
                <Typography variant="h4" sx={{textAlign:'center', fontWeight:'bold'}}>
                    $950.27
                </Typography>
                <Typography variant="subtitle1" sx={{textAlign:'right', fontWeight:'light'}}>
                    per month
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="subtitle1" sx={{textAlign:'left', fontWeight:'light'}}>
                    Your expenses are...
                </Typography>
                <Typography variant="h4" sx={{textAlign:'center', fontWeight:'bold'}}>
                    $4445.83
                </Typography>
                <Typography variant="subtitle1" sx={{textAlign:'right', fontWeight:'light'}}>
                    per month
                </Typography>
            </Stack>
        </Paper>
    )
}

export default IncomeAndExpensesOverview;