import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ReferenceLine } from "recharts"
import { currencyFormatter } from "../../tools/currencyFormatter"
import { shortDate } from "../../tools/shortDate"
import { useState, useEffect } from "react"
import { Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { calculateMonthlyBudget, calculateDailyBudget } from "../../tools/budgetCalculators"
import { calculateTotalRecurringIncome, calculateTotalRecurringExpenses } from "../../tools/spendingCalculators"

interface IDailySpendingChartProps {
    expenses:any[]
    recurringIncomes:any[]
    recurringExpenses:any[]
    userMetadata:any
}

const DailySpendingChart = (props:IDailySpendingChartProps) => {

    const [chartData, setChartData] = useState<any[]>([])
    const [dailyBudget, setDailyBudget] = useState(0)

    useEffect(() => {
        let newChartData = []
        let currentDate = new Date()
        for (let i = 29; i >= 0; i--) {
            const date = new Date(currentDate)
            date.setDate(currentDate.getDate() - i)

            let expensesAmount = 0
            if (props.expenses.length > 0) {
                const expensesByDate = props.expenses.filter((e:any) => {
                    const expenseDate = new Date(e.date)
                    return (
                        expenseDate.getDate() === date.getDate() &&
                        expenseDate.getMonth() === date.getMonth() &&
                        expenseDate.getFullYear() === date.getFullYear()
                    )
                })
                if (expensesByDate.length > 0) {
                    expensesAmount = expensesByDate.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
                }
            }

            newChartData.push({
                date: date,
                amount: expensesAmount
            })
        }

        setChartData(newChartData)
    }, [props.expenses])

    useEffect(() => {
        let newTotalRecurringIncome = calculateTotalRecurringIncome(props.recurringIncomes)
        let newTotalRecurringExpenses = calculateTotalRecurringExpenses(props.recurringExpenses)
        let newMonthlyBudget = calculateMonthlyBudget(newTotalRecurringIncome, newTotalRecurringExpenses, props.userMetadata?.savingsGoal)
        let newDailyBudget = calculateDailyBudget(newMonthlyBudget)

        setDailyBudget(newDailyBudget)
    }, [props.userMetadata, props.recurringIncomes, props.recurringExpenses])

    return (
        <Stack height="100%" spacing={2}>
            <Typography variant="h6">
                Daily Spending
            </Typography>
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{left:20}}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => shortDate(value)} />
                    <YAxis tickFormatter={(value) => currencyFormatter(value)} />
                    <Tooltip separator=": " formatter={(value) => currencyFormatter(value as number)} labelFormatter={(label) => shortDate(label)} />
                    <ReferenceLine y={dailyBudget} label="Target Daily Spending" stroke="red" strokeDasharray="3 3" />
                    <Legend />
                    <Bar name="Daily Spending" dataKey="amount" fill="#d93511" />
                </BarChart>
            </ResponsiveContainer>
        </Stack>
    )
}

export default DailySpendingChart