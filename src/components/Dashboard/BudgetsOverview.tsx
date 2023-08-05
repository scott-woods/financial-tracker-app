import { Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { currencyFormatter } from "../../tools/currencyFormatter"
import { useEffect, useState } from "react"
import { calculateDailyBudget, calculateMonthlyBudget, calculateRemainingDailyBudget, calculateRemainingMonthlyBudget } from "../../tools/budgetCalculators"
import { calculateTotalRecurringIncome, calculateTotalRecurringExpenses, calculateExpensesThisMonth, calculateExpensesToday } from "../../tools/spendingCalculators"

interface IBudgetsOverviewProps {
    userMetadata:any
    recurringIncomes:any[]
    recurringExpenses:any[]
    expenses:any[]
}

const BudgetsOverview = (props:IBudgetsOverviewProps) => {

    const [totalRecurringIncome, setTotalRecurringIncome] = useState(0)
    const [totalRecurringExpenses, setTotalRecurringExpenses] = useState(0)
    const [monthlyBudget, setMonthlyBudget] = useState(0)
    const [remainingMonthlyBudget, setRemainingMonthlyBudget] = useState(0)
    const [dailyBudget, setDailyBudget] = useState(0)
    const [remainingDailyBudget, setRemainingDailyBudget] = useState(0)
    const [expensesToday, setExpensesToday] = useState(0)
    const [expensesThisMonth, setExpensesThisMonth] = useState(0)

    useEffect(() => {
        let newTotalRecurringIncome = calculateTotalRecurringIncome(props.recurringIncomes)
        let newTotalRecurringExpenses = calculateTotalRecurringExpenses(props.recurringExpenses)
        let newMonthlyBudget = calculateMonthlyBudget(newTotalRecurringIncome, newTotalRecurringExpenses, props.userMetadata?.savingsGoal)
        let newRemainingMonthlyBudget = calculateRemainingMonthlyBudget(newMonthlyBudget, props.expenses)
        let newDailyBudget = calculateDailyBudget(newMonthlyBudget)
        let newExpensesToday = calculateExpensesToday(props.expenses)
        let newRemainingDailyBudget = calculateRemainingDailyBudget(newDailyBudget, newExpensesToday)
        let newExpensesThisMonth = calculateExpensesThisMonth(props.expenses)

        setTotalRecurringIncome(newTotalRecurringIncome)
        setTotalRecurringExpenses(newTotalRecurringExpenses)
        setMonthlyBudget(newMonthlyBudget)
        setRemainingMonthlyBudget(newRemainingMonthlyBudget)
        setDailyBudget(newDailyBudget)
        setExpensesToday(newExpensesToday)
        setRemainingDailyBudget(newRemainingDailyBudget)
        setExpensesThisMonth(newExpensesThisMonth)
    }, [props.userMetadata, props.recurringIncomes, props.recurringExpenses, props.expenses])
    
    return (
        <Stack height="100%">
            <Typography variant="h6">
                Budgets
            </Typography>
            <Box display="flex" justifyContent="space-evenly" height="100%">
                <Box width="25%">
                    <CircularProgressbar
                        minValue={0}
                        maxValue={monthlyBudget}
                        value={remainingMonthlyBudget}
                        text={currencyFormatter(remainingMonthlyBudget)}
                    />
                </Box>
                <Box width="25%">
                    <CircularProgressbar
                        minValue={0}
                        maxValue={dailyBudget}
                        value={remainingDailyBudget}
                        text={currencyFormatter(remainingDailyBudget)}
                        styles={buildStyles({
                            pathColor: `#86608E`
                        })}
                    />
                </Box>
                {/* <Box padding={10}>
                    <CircularProgressbar
                        minValue={0}
                        maxValue={monthlyBudget}
                        value={remainingMonthlyBudget}
                        text={currencyFormatter(remainingMonthlyBudget)}
                    />
                </Box>
                <Box padding={10}>
                    <CircularProgressbar
                        minValue={0}
                        maxValue={dailyBudget}
                        value={remainingDailyBudget}
                        text={currencyFormatter(remainingDailyBudget)}
                        styles={buildStyles({
                            pathColor: `#86608E`
                        })}
                    />
                </Box> */}
            </Box>
        </Stack>
    )
}

export default BudgetsOverview