import { Paper, Stack, Typography } from "@mui/material";
import { currencyFormatter } from "../../tools/currencyFormatter";

interface IIncomeAndExpensesOverviewProps {
    totalIncome:number,
    totalInvestments:number,
    totalExpenses:number
}

const IncomeAndExpensesOverview = (props:IIncomeAndExpensesOverviewProps) => {
    return (
        <Paper elevation={6} sx={{display:'flex', justifyContent: 'space-around', padding:2}}>
            <Stack spacing={1}>
                <Typography variant="subtitle1" sx={{textAlign:'left', fontWeight:'light'}}>
                    Your liquid income is...
                </Typography>
                <Typography variant="h4" sx={{textAlign:'center', fontWeight:'bold'}}>
                    {currencyFormatter(props.totalIncome)}
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
                    {currencyFormatter(props.totalInvestments)}
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
                    {currencyFormatter(props.totalExpenses)}
                </Typography>
                <Typography variant="subtitle1" sx={{textAlign:'right', fontWeight:'light'}}>
                    per month
                </Typography>
            </Stack>
        </Paper>
    )
}

export default IncomeAndExpensesOverview;