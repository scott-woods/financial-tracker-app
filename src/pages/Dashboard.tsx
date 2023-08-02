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


const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const Dashboard = () => {
    
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true);
    const [monthlyBudgetState, setMonthlyBudgetState] = useState(0)
    const [remainingMonthlyBudgetState, setRemainingMonthlyBudgetState] = useState(0)
    const [dailyBudgetState, setDailyBudgetState] = useState(0)
    const [remainingDailyBudgetState, setRemainingDailyBudgetState] = useState(0)
    const [netWorthState, setNetWorthState] = useState(0)

    useEffect(() => {
        dispatch(setSelectedPage(0))
        getData()
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)

            const date = new Date()
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 0)
            const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
    
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
    
            const monthlyBudget = getMonthlyBudget(recurringIncome, recurringExpenses, userMetadata.savingsGoal)
            const remainingMonthlyBudget = getRemainingMonthlyBudget(monthlyBudget, expenses)
            const dailyBudget = getDailyBudget(monthlyBudget)
            const remainingDailyBudget = getRemainingDailyBudget(dailyBudget, expenses)
            const netWorth = getNetWorth(assets, debts)

            setMonthlyBudgetState(monthlyBudget)
            setRemainingMonthlyBudgetState(remainingMonthlyBudget)
            setDailyBudgetState(dailyBudget)
            setRemainingDailyBudgetState(remainingDailyBudget)
            setNetWorthState(netWorth)
        }
        catch (error:any) {
            alert("Error occurred while getting data - " + error.message)
            console.error(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    const getMonthlyBudget = (recurringIncome:any, recurringExpenses:any, savingsGoal:any) => {
        let totalRecurringIncome = 0
        let totalRecurringExpenses = 0

        if (recurringIncome.length > 0) {
            totalRecurringIncome = recurringIncome.map((i:any) => i.amount).reduce((prev:any, next:any) => prev + next)
        }
        if (recurringExpenses.length > 0) {
            totalRecurringExpenses = recurringExpenses.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
        }
        
        return totalRecurringIncome - totalRecurringExpenses - savingsGoal
    }

    const getRemainingMonthlyBudget = (monthlyBudget:any, expenses : any) => {
        let totalExpenses = 0

        if (expenses.length > 0) {
            totalExpenses = expenses.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
        }
         
        return monthlyBudget - totalExpenses
    }

    const getDailyBudget = (monthlyBudget:any) => {
        let now = new Date()
        let daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
        return monthlyBudget / daysInMonth
    }

    const getRemainingDailyBudget = (dailyBudget:any, expenses:any) => {
        let totalDailyExpenses = 0
        if (expenses?.length > 0) {
            let dailyExpenses = expenses
                .filter((e:any) => {
                    let now = new Date()
                    let date = new Date(e.date)
                    return (
                        date.getDate() === now.getDate() &&
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()
                    )
                })
            if (dailyExpenses.length > 0) {
                totalDailyExpenses = dailyExpenses.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
            }
        }

        return dailyBudget - totalDailyExpenses
    }

    const getNetWorth = (assets:any, debts:any) => {
        let totalAssets = 0
        let totalDebts = 0
        
        if (assets.length > 0) {
            totalAssets = assets.map((a:any) => a.value).reduce((prev:any, next:any) => prev + next)
        }
        if (debts.length > 0) {
            totalDebts = debts.map((d:any) => d.amount).reduce((prev:any, next:any) => prev + next)
        }      

        return totalAssets - totalDebts
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
            <Grid container spacing={4} padding={4}>
                <Grid item lg={12}>
                    <Typography variant={"h2"}>
                        {formattedDate}
                    </Typography>
                </Grid>
                <Grid item lg={12}>
                    <Grid container spacing={4} alignItems="stretch">
                        <Grid item lg={7}>
                            <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                                <Box display="flex" justifyContent="center">
                                    <Paper sx={{padding:2, height:'100%'}} elevation={12}>
                                        <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                            <Typography variant="h6">
                                                Remaining Monthly Budget
                                            </Typography>
                                            <CircularProgressWithLabel 
                                            value={(remainingMonthlyBudgetState / monthlyBudgetState) * 100} 
                                            text={currencyFormatter(remainingMonthlyBudgetState)} />
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
                                            value={(remainingDailyBudgetState / dailyBudgetState) * 100} 
                                            text={currencyFormatter(remainingDailyBudgetState)} />
                                        </Box>
                                    </Paper> 
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <Paper sx={{padding:2, height:'100%'}} elevation={12}>
                                        <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                            <Typography variant="h6">
                                                Remaining Daily Budget
                                            </Typography>
                                            <CircularProgressWithLabel value={75} text="$30" />
                                        </Box>
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
                                            {currencyFormatter(netWorthState)}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Grid container spacing={4} alignItems="stretch">
                        <Grid item lg={7}>
                            <Paper sx={{padding:2, height:'100%'}} elevation={8}>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h1">
                                        Chart
                                    </Typography>
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
