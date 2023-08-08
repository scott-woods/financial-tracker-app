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
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">
                Monthly Savings
            </Typography>
            <Stack>
                <Typography variant="h6" fontWeight="lighter">
                    Income
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {currencyFormatter(totalRecurringIncome)}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="h6" fontWeight="lighter">
                    Investments
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {currencyFormatter(totalRecurringInvestments)}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="h6" fontWeight="lighter">
                    Expenses
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {currencyFormatter(totalRecurringExpenses)}
                </Typography>
            </Stack>
        </Box>
    )
}

export default SavingsOverview