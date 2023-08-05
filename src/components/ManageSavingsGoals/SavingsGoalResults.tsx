import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { calculateMonthlyBudget, calculateDailyBudget } from "../../tools/budgetCalculators"
import { calculateTotalRecurringIncome, calculateTotalRecurringExpenses } from "../../tools/spendingCalculators"
import Loading from "../Loading"
import { currencyFormatter } from "../../tools/currencyFormatter"

interface ISavingsGoalResultsProps {
    savingsGoal:number
    totalRecurringIncome:number
    totalRecurringExpenses:number
    isEditing:boolean
}

const SavingsGoalResults = (props:ISavingsGoalResultsProps) => {

    const [monthlyBudget, setMonthlyBudget] = useState(0)
    const [dailyBudget, setDailyBudget] = useState(0)

    useEffect(() => {
        let newMonthlyBudget = calculateMonthlyBudget(props.totalRecurringIncome, props.totalRecurringExpenses, props.savingsGoal)
        let newDailyBudget = calculateDailyBudget(newMonthlyBudget)
        setMonthlyBudget(newMonthlyBudget)
        setDailyBudget(newDailyBudget)
    }, [props.savingsGoal, props.totalRecurringIncome, props.totalRecurringExpenses])

    return (
        <Box width="100%" display="flex" flexDirection="column">
            <Box width="100%" display="flex" justifyContent="space-around">
                <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1" fontWeight="lighter">
                        {props.isEditing ? "Your estimated Monthly Budget is..." : "Your Monthly Budget is..."}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" alignSelf="center">
                        {currencyFormatter(monthlyBudget)}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1" fontWeight="lighter">
                        {props.isEditing ? "Your estimated Daily Budget is..." : "Your Daily Budget is..."}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" alignSelf="center">
                        {currencyFormatter(dailyBudget)}
                    </Typography>
                </Box>
            </Box>
        </Box>   
    )
}

export default SavingsGoalResults