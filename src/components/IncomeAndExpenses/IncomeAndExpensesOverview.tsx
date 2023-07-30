import { Paper, Stack, Typography } from "@mui/material";
import { currencyFormatter } from "../../tools/currencyFormatter";
import { useEffect, useState } from "react";
import { timeframes } from "../../timeframes";

interface IIncomeAndExpensesOverviewProps {
    recurringIncomeList:any
    recurringInvestmentList:any
    recurringExpenseList:any
}

const IncomeAndExpensesOverview = (props:IIncomeAndExpensesOverviewProps) => {

    const [totalIncome, setTotalIncome] = useState(0)
    const [totalInvestments, setTotalInvestments] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    useEffect(() => {
        updateValues()
    }, [props.recurringIncomeList, props.recurringInvestmentList, props.recurringExpenseList])

    const updateValues = () => {
        let averageMonthlyIncome = 0
        let averageMonthlyInvestments = 0
        let averageMonthlyExpenses = 0

        if (props.recurringIncomeList.length > 0) {
            averageMonthlyIncome = props.recurringIncomeList.reduce((prev:any, next:any) => {
                let nextValue = getNextValue(next)
                return prev + nextValue
            }, 0)
        }
        if (props.recurringInvestmentList.length > 0) {
            averageMonthlyInvestments = props.recurringInvestmentList.reduce((prev:any, next:any) => {
                let nextValue = getNextValue(next)
                //subtract from liquid if this investment is from liquid
                if (next.isFromLiquid) {
                    averageMonthlyIncome -= nextValue
                }
                return prev + nextValue
            }, 0)
        }
        if (props.recurringExpenseList.length > 0) {
            averageMonthlyExpenses = props.recurringExpenseList.reduce((prev:any, next:any) => {
                let nextValue = getNextValue(next)
                return prev + nextValue
            }, 0)
        }

        //set states
        setTotalIncome(averageMonthlyIncome)
        setTotalInvestments(averageMonthlyInvestments)
        setTotalExpenses(averageMonthlyExpenses)
    }

    const getNextValue = (next:any) => {
        let monthlyIndex = timeframes.find(t => t.label === "Monthly").value
        let yearlyIndex = timeframes.find(t => t.label === "Yearly").value

        switch (next.timeframe) {
            case monthlyIndex:
                return next.amount
            case yearlyIndex:
                return next.amount / 12
            default:
                return 0
        }
    }

    return (
        <Paper elevation={6} sx={{display:'flex', justifyContent: 'space-around', padding:2}}>
            <Stack spacing={1}>
                <Typography variant="subtitle1" sx={{textAlign:'left', fontWeight:'light'}}>
                    Your liquid income is...
                </Typography>
                <Typography variant="h4" sx={{textAlign:'center', fontWeight:'bold'}}>
                    {currencyFormatter(totalIncome)}
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
                    {currencyFormatter(totalInvestments)}
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
                    {currencyFormatter(totalExpenses)}
                </Typography>
                <Typography variant="subtitle1" sx={{textAlign:'right', fontWeight:'light'}}>
                    per month
                </Typography>
            </Stack>
        </Paper>
    )
}

export default IncomeAndExpensesOverview;