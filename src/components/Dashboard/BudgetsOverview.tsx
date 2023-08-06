import { Button, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import { currencyFormatter } from "../../tools/currencyFormatter"
import { useEffect, useRef, useState } from "react"
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

    const monthlyCircleRef = useRef<HTMLInputElement>(null)
    const monthlyCircleTextRef = useRef<HTMLInputElement>(null)
    const dailyCircleRef = useRef<HTMLInputElement | null>(null)
    const dailyCircleTextRef = useRef<HTMLInputElement>(null)
    const [monthlyFontSize, setMonthlyFontSize] = useState(16)
    const [dailyFontSize, setDailyFontSize] = useState(16)

    useEffect(() => {
        const containerWidth = monthlyCircleRef.current?.offsetWidth
        const textWidth = monthlyCircleTextRef.current?.offsetWidth

        if (textWidth && containerWidth) {
            if (textWidth > (containerWidth * .8)) {
                const newFontSize = ((containerWidth * .8) / textWidth) * monthlyFontSize
                setMonthlyFontSize(newFontSize)
            }
        }
    }, [remainingMonthlyBudget])

    useEffect(() => {
        const containerWidth = dailyCircleRef.current?.offsetWidth
        const textWidth = dailyCircleTextRef.current?.offsetWidth

        if (textWidth && containerWidth) {
            if (textWidth > (containerWidth * .8)) {
                const newFontSize = ((containerWidth * .8) / textWidth) * dailyFontSize
                setDailyFontSize(newFontSize)
            }
        }
    }, [remainingDailyBudget])

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
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
                <Box display="flex" flexDirection="column" alignItems="center" width="25%" gap={1} ref={monthlyCircleRef}>
                    <CircularProgressbarWithChildren
                        minValue={0}
                        maxValue={monthlyBudget}
                        value={remainingMonthlyBudget}
                    >
                        <Typography fontSize={`${monthlyFontSize}px`} ref={monthlyCircleTextRef}>
                            {currencyFormatter(remainingMonthlyBudget)}
                        </Typography>
                    </CircularProgressbarWithChildren>
                    <Typography variant="h6" fontWeight="lighter" textAlign="center" noWrap>
                        Monthly Budget
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center" width="25%" gap={1} ref={dailyCircleRef}>
                    <CircularProgressbarWithChildren
                        minValue={0}
                        maxValue={dailyBudget}
                        value={remainingDailyBudget}
                        styles={buildStyles({
                            pathColor: `#86608E`
                        })}
                    >
                        <Typography fontSize={`${dailyFontSize}px`} ref={dailyCircleTextRef}>
                            {currencyFormatter(remainingDailyBudget)}
                        </Typography>
                    </CircularProgressbarWithChildren>
                    <Typography variant="h6" fontWeight="lighter" textAlign="center" noWrap>
                        Daily Budget
                    </Typography>
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