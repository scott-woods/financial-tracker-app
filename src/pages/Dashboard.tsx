import { AppBar, Box, CircularProgress, Container, Divider, Grid, Paper, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthRequired";
import ExpensesTab from "../components/IncomeAndExpenses/ExpensesTab";
import IncomeTab from "../components/IncomeAndExpenses/IncomeTab";
import InvestmentsTab from "../components/IncomeAndExpenses/InvestmentsTab";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import useApi from "../hooks/useApi";
import usersApi from "../Api/usersApi";
import recurringIncomesApi from "../Api/recurringIncomesApi";
import recurringExpensesApi from "../Api/recurringExpensesApi";
import expensesApi from "../Api/expensesApi";
import { currencyFormatter } from "../tools/currencyFormatter";
import { useDispatch } from "react-redux";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import TodaysSpending from "../components/Dashboard/TodaysSpending";
import { calculateMonthlyBudget, calculateRemainingMonthlyBudget, calculateDailyBudget, calculateRemainingDailyBudget } from "../tools/budgetCalculators";
import { calculateExpensesToday } from "../tools/spendingCalculators";
import { calculateNetWorth } from "../tools/valueCalculators";


const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const Dashboard = () => {
    
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState<any[]>([])
    const [expensesToday, setExpensesToday] = useState(0)

    const [recurringIncomes, setRecurringIncomes] = useState<any[]>([])
    const [recurringExpenses, setRecurringExpenses] = useState<any[]>([])
    const [userMetadata, setUserMetadata] = useState<any | null | undefined>(null)
    const [expenses, setExpenses] = useState<any[]>([])
    const [assets, setAssets] = useState<any[]>([])
    const [debts, setDebts] = useState<any[]>([])

    const [monthlyBudget, setMonthlyBudget] = useState(0)
    const [remainingMonthlyBudget, setRemainingMonthlyBudget] = useState(0)
    const [dailyBudget, setDailyBudget] = useState(0)
    const [remainingDailyBudget, setRemainingDailyBudget] = useState(0)
    const [netWorth, setNetWorth] = useState(0)

    useEffect(() => {
        dispatch(setSelectedPage(0))
        getData()
    }, [])

    useEffect(() => {
        let newChartData = []
        let currentDate = new Date()
        for (let i = 29; i >= 0; i--) {
            const date = new Date(currentDate)
            date.setDate(currentDate.getDate() - i)

            let expensesAmount = 0
            if (expenses.length > 0) {
                const expensesByDate = expenses.filter((e:any) => {
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
    }, [expenses])

    useEffect(() => {
        let newMonthlyBudget = calculateMonthlyBudget(recurringIncomes, recurringExpenses, userMetadata)

        setMonthlyBudget(newMonthlyBudget)
    }, [recurringIncomes, recurringExpenses, userMetadata])

    useEffect(() => {
        let newRemainingMonthlyBudget = calculateRemainingMonthlyBudget(monthlyBudget, expenses)
        let newDailyBudget = calculateDailyBudget(monthlyBudget)
        let newExpensesToday = calculateExpensesToday(expenses)
        let newRemainingDailyBudget = calculateRemainingDailyBudget(newDailyBudget, newExpensesToday)

        setRemainingMonthlyBudget(newRemainingMonthlyBudget)
        setDailyBudget(newDailyBudget)
        setExpensesToday(newExpensesToday)
        setRemainingDailyBudget(newRemainingDailyBudget)
    }, [monthlyBudget, expenses])

    useEffect(() => {
        let newNetWorth = calculateNetWorth(assets, debts)
        setNetWorth(newNetWorth)
    })

    const getData = async () => {
        try {
            setIsLoading(true)

            const date = new Date()
            const firstDay = new Date()
            firstDay.setDate(date.getDate() - 29)
            const lastDay = new Date()
            lastDay.setDate(date.getDate())
    
            const [userMetadataRes, recurringIncomeRes, recurringExpensesRes, expensesRes, assetsRes, debtsRes] = await Promise.all([
                axios.get(`/api/v1/Users`),
                axios.get(`/api/v1/RecurringIncomes`),
                axios.get(`/api/v1/RecurringExpenses`),
                axios.get(`/api/v1/Expenses`, {
                    params: {
                        startDate: firstDay,
                        endDate: lastDay
                    }
                }),
                axios.get(`/api/v1/Assets`),
                axios.get(`/api/v1/Debts`)
            ])
    
            const userMetadata = userMetadataRes.data
            const recurringIncome = recurringIncomeRes.data
            const recurringExpenses = recurringExpensesRes.data
            const expenses = expensesRes.data
            const assets = assetsRes.data
            const debts = debtsRes.data

            setUserMetadata(userMetadata)
            setRecurringIncomes(recurringIncome)
            setRecurringExpenses(recurringExpenses)
            setExpenses(expenses)
            setAssets(assets)
            setDebts(debts)
        }
        catch (error:any) {
            alert("Error occurred while getting data - " + error.message)
            console.error(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    else {
        return (
            <Grid container spacing={2} padding={4}>
                <Grid item lg={12}>
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item lg={7}>
                            <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                                <Box display="flex" justifyContent="center">
                                    <Paper sx={{padding:2, height:'100%'}} elevation={12}>
                                        <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                            <Typography variant="h6">
                                                Remaining Monthly Budget
                                            </Typography>
                                            <CircularProgressWithLabel 
                                            value={(remainingMonthlyBudget / monthlyBudget) * 100} 
                                            text={currencyFormatter(remainingMonthlyBudget)} />
                                        </Box>
                                    </Paper>
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <Paper sx={{padding:2, height:'100%'}} elevation={12}>
                                        <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                            <Typography variant="h6">
                                                Remaining Daily Budget
                                            </Typography>
                                            <CircularProgressWithLabel 
                                            value={(remainingDailyBudget / dailyBudget) * 100} 
                                            text={currencyFormatter(remainingDailyBudget)} />
                                        </Box>
                                    </Paper> 
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <Paper sx={{padding:2, height:'100%'}} elevation={12}>
                                        <TodaysSpending amount={expensesToday} setExpenses={setExpenses} />
                                    </Paper> 
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item lg={5}>
                            <Box display="flex-block" justifyContent="center" sx={{height:'100%'}}>
                                <Paper sx={{padding:2, height:'100%'}} elevation={8}>
                                    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                        <Typography variant="h6">
                                            Net Worth
                                        </Typography>
                                        <Typography>
                                            {currencyFormatter(netWorth)}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item lg={7}>
                            <Paper sx={{height:"500px"}}>
                                <Box height="100%" padding={2}>
                                    <ResponsiveContainer>
                                        <BarChart
                                            height={500}
                                            width={730}
                                            data={chartData}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="amount" fill="#d93511" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item lg={5}>
                            <Stack display={"flex"} direction="row" height={"100%"} justifyContent={"space-between"}>
                                <Paper sx={{padding:2, height:'100%', width:'100%'}} elevation={8}>
                                    <Box display="flex">
                                        <Typography variant="h6">
                                            Monthly Savings
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Dashboard;
