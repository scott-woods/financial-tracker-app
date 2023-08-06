import { Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useState, useEffect } from "react"
import { calculateTotalRecurringIncome, calculateTotalRecurringExpenses, calculateTotalRecurringInvestments } from "../../tools/spendingCalculators"
import { currencyFormatter } from "../../tools/currencyFormatter"

interface ISavingsOverviewProps {
    recurringIncomes: any[]
    recurringInvestments: any[]
    recurringExpenses: any[]
    expenses: any[]
}

const SavingsOverview = (props:ISavingsOverviewProps) => {

    const [totalRecurringIncome, setTotalRecurringIncome] = useState(0)
    const [totalRecurringInvestments, setTotalRecurringInvestments] = useState(0)
    const [totalRecurringExpenses, setTotalRecurringExpenses] = useState(0)

    useEffect(() => {
        let newTotalRecurringIncome = calculateTotalRecurringIncome(props.recurringIncomes)
        let newTotalRecurringInvestments = calculateTotalRecurringInvestments(props.recurringInvestments)
        let newTotalRecurringExpenses = calculateTotalRecurringExpenses(props.recurringExpenses)

        setTotalRecurringIncome(newTotalRecurringIncome)
        setTotalRecurringInvestments(newTotalRecurringInvestments)
        setTotalRecurringExpenses(newTotalRecurringExpenses)
    }, [props.recurringIncomes, props.recurringInvestments, props.recurringExpenses, props.expenses])

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-evenly">
            <Stack>
                <Typography variant="subtitle1" fontStyle="italic" noWrap>
                    Your Income this Month
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                    {currencyFormatter(totalRecurringIncome)}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="subtitle1" fontStyle="italic" noWrap>
                    Your Investments this Month
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                    {currencyFormatter(totalRecurringInvestments)}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="subtitle1" fontStyle="italic" noWrap>
                    Your Expenses this Month
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                    {currencyFormatter(totalRecurringExpenses)}
                </Typography>
            </Stack>
        </Box>
    )
}

export default SavingsOverview