import { AppBar, Box, CircularProgress, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material";
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
import { calculateExpensesThisMonth, calculateExpensesToday, calculateTotalRecurringExpenses, calculateTotalRecurringIncome } from "../tools/spendingCalculators";
import { calculateAssetsValues, calculateDebtsAmount, calculateNetWorth } from "../tools/valueCalculators";
import Loading from "../components/Loading";
import RecentExpenses from "../components/Dashboard/RecentExpenses";
import { shortDate } from "../tools/shortDate";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DailySpendingChart from "../components/Dashboard/DailySpendingChart";
import BudgetsOverview from "../components/Dashboard/BudgetsOverview";
import NetWorthOverview from "../components/Dashboard/NetWorthOverview";
import SavingsOverview from "../components/Dashboard/SavingsOverview";


const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const Dashboard = () => {
    
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true);

    const [recurringIncomes, setRecurringIncomes] = useState<any[]>([])
    const [recurringInvestments, setRecurringInvestments] = useState<any[]>([])
    const [recurringExpenses, setRecurringExpenses] = useState<any[]>([])
    const [userMetadata, setUserMetadata] = useState<any | null | undefined>(null)
    const [expenses, setExpenses] = useState<any[]>([])
    const [assets, setAssets] = useState<any[]>([])
    const [debts, setDebts] = useState<any[]>([])

    useEffect(() => {
        dispatch(setSelectedPage(0))
        getData()
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)

            const date = new Date()
            const firstDay = new Date()
            firstDay.setDate(date.getDate() - 29)
            const lastDay = new Date()
            lastDay.setDate(date.getDate())
    
            const [userMetadataRes, recurringIncomeRes, recurringInvestmentsRes, recurringExpensesRes, expensesRes, assetsRes, debtsRes] = await Promise.all([
                axios.get(`/api/v1/Users`),
                axios.get(`/api/v1/RecurringIncomes`),
                axios.get(`/api/v1/RecurringInvestments`),
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
            const recurringInvestments = recurringInvestmentsRes.data
            const recurringExpenses = recurringExpensesRes.data
            const expenses = expensesRes.data
            const assets = assetsRes.data
            const debts = debtsRes.data

            setUserMetadata(userMetadata)
            setRecurringIncomes(recurringIncome)
            setRecurringInvestments(recurringInvestments)
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
            <Loading />
        )
    }
    else {
        return (
            <Grid container padding={4} height="100%" spacing={2}>
                <Grid item xs={8}>
                    <Box display="flex" flexDirection="column" gap={2} height="100%" justifyContent="space-between">
                        <Box flexGrow={1}>
                            <Box display="flex" gap={2} height="100%">
                                <Paper sx={{padding:2, flexGrow:1}}>
                                    <SavingsOverview
                                        recurringIncomes={recurringIncomes}
                                        recurringInvestments={recurringInvestments}
                                        recurringExpenses={recurringExpenses}
                                        expenses={recurringExpenses}
                                    />
                                </Paper>
                                <Paper sx={{padding:2, flexGrow:1}}>
                                    <BudgetsOverview
                                        userMetadata={userMetadata}
                                        recurringIncomes={recurringIncomes}
                                        recurringExpenses={recurringExpenses}
                                        expenses={expenses}
                                    />
                                </Paper>
                            </Box>
                        </Box>
                        <Box flexGrow={2}>
                            <Box display="flex" gap={2} height="100%">
                                <Paper sx={{padding:2, flexGrow:1}}>
                                    <DailySpendingChart expenses={expenses} />
                                </Paper>
                                <Paper sx={{padding:2, flexGrow:0}}>
                                    <RecentExpenses expenses={expenses} setExpenses={setExpenses} />
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={{padding:2, height:"100%"}}>
                        <NetWorthOverview
                            assets={assets}
                            debts={debts}
                        />
                    </Paper>
                </Grid>
            </Grid>
            // <Box display="flex" flexDirection="column" padding={4} gap={2} overflow="auto">
            //     <Grid container spacing={2}>
            //         <Grid item xs={7}>
            //             <Paper sx={{padding:2, height:"100%"}}>

            //             </Paper>
            //         </Grid>
            //         <Grid item xs={5}>
            //             <Paper sx={{padding:2}}>
            //                 <Box display="flex" justifyContent="space-evenly">
            //                     <Box padding="5%">
            //                         <CircularProgressbar
            //                             minValue={0}
            //                             maxValue={monthlyBudget}
            //                             value={remainingMonthlyBudget}
            //                             text={currencyFormatter(remainingMonthlyBudget)}
            //                         />
            //                     </Box>
            //                     <Box padding="5%">
            //                         <CircularProgressbar
            //                             minValue={0}
            //                             maxValue={dailyBudget}
            //                             value={remainingDailyBudget}
            //                             text={currencyFormatter(remainingDailyBudget)}
            //                             styles={buildStyles({
            //                                 pathColor: `#86608E`
            //                             })}
            //                         />
            //                     </Box>
            //                 </Box>
            //             </Paper>
            //         </Grid>
            //     </Grid>
            //     <Grid container spacing={2}>
            //         <Grid item xs={7}>
            //             <Paper sx={{padding:2, height:"100%"}}>
            //                 <ResponsiveContainer>
            //                     <BarChart
            //                         data={chartData}
            //                         margin={{left:20}}
            //                     >
            //                         <CartesianGrid strokeDasharray="3 3" />
            //                         <XAxis dataKey="date" tickFormatter={(value) => shortDate(value)} />
            //                         <YAxis tickFormatter={(value) => currencyFormatter(value)} />
            //                         <Tooltip separator=": " formatter={(value) => currencyFormatter(value as number)} labelFormatter={(label) => shortDate(label)} />
            //                         <Legend />
            //                         <Bar name="Daily Spending" dataKey="amount" fill="#d93511" />
            //                     </BarChart>
            //                 </ResponsiveContainer>
            //             </Paper>
            //         </Grid>
            //         <Grid item xs={5}>
            //             <Box height="100%" display="flex" gap={2}>
            //                 <Paper sx={{padding:2, height:"100%", width:"100%"}}>
            //                     <RecentExpenses expenses={expenses} setExpenses={setExpenses} />
            //                 </Paper>
            //                 <Paper sx={{padding:2, height:"100%", width:"100%"}}>
                                
            //                 </Paper>
            //             </Box>
            //         </Grid>
            //     </Grid>
            // </Box>
            // <Grid container padding={4} height="100%" overflow="auto">
            //     <Grid item xs={8} paddingRight={1}>
            //         <Stack height="100%" spacing={2}>
            //             <Grid container flexWrap="nowrap">
            //                 <Grid item flexGrow={1} paddingRight={1}>
            //                     <Stack spacing={2}>
            //                         <Paper sx={{padding:2}}>
            //                             <Stack>
            //                                 <Typography variant="h6" fontWeight="bold">
            //                                     Hello!
            //                                 </Typography>
            //                                 <Box height="100%">
            //                                     <ul>
            //                                         <li>
            //                                             <Typography variant="body1" fontSize={16}>
            //                                                 Your Savings Goal is <span style={{fontWeight:"bold"}}>{currencyFormatter(userMetadata.savingsGoal)}</span> each month.
            //                                             </Typography>
            //                                         </li>
            //                                         <li>
            //                                             <Typography variant="body1" fontSize={16}>
            //                                                 Your Monthly Budget is <span style={{fontWeight:"bold"}}>{currencyFormatter(monthlyBudget)}</span>.
            //                                             </Typography>
            //                                         </li>
            //                                         <li>
            //                                             <Typography variant="body1" fontSize={16}>
            //                                                 Your Target Daily Spending is <span style={{fontWeight:"bold"}}>{currencyFormatter(dailyBudget)}</span>.
            //                                             </Typography>
            //                                         </li>
            //                                     </ul>
            //                                 </Box>
            //                                 <Typography variant="subtitle1" fontStyle="italic" fontWeight="lighter">
            //                                     {formattedDate}
            //                                 </Typography>
            //                             </Stack>
            //                         </Paper>
            //                         <Paper sx={{padding:2}}>
            //                             <Box display="flex" justifyContent="space-between">
            //                                 <Stack>
            //                                     <Typography variant="caption" fontWeight="lighter" noWrap>
            //                                         Your Income:
            //                                     </Typography>
            //                                     <Typography align="center" fontWeight="bold">
            //                                         {currencyFormatter(totalRecurringIncome)}
            //                                     </Typography>
            //                                 </Stack>
            //                                 <Stack>
            //                                     <Typography variant="caption" fontWeight="lighter" noWrap>
            //                                         Your Expenses:
            //                                     </Typography>
            //                                     <Typography align="center" fontWeight="bold">
            //                                         {currencyFormatter(totalRecurringExpenses + expensesThisMonth)}
            //                                     </Typography>
            //                                 </Stack>
            //                                 <Stack>
            //                                     <Typography variant="caption" fontWeight="lighter" noWrap>
            //                                         Your Monthly Savings:
            //                                     </Typography>
            //                                     <Typography align="center" fontWeight="bold">
            //                                         {currencyFormatter(totalRecurringIncome - totalRecurringExpenses - expensesThisMonth)}
            //                                     </Typography>
            //                                 </Stack>
            //                             </Box>
            //                         </Paper>
            //                     </Stack>
            //                 </Grid>
            //                 <Grid item flexGrow={1} paddingLeft={1} paddingRight={1}>
            //                     <Paper sx={{height:"100%", padding:2}}>
            //                         <Stack height="100%">
            //                             <Typography variant="h6" align="center">
            //                                 Monthly Budget
            //                             </Typography>
            //                             <Box height="100%" display="flex" justifyContent="center" alignItems="center">
            //                                 <CircularProgressbar
            //                                     minValue={0}
            //                                     maxValue={monthlyBudget}
            //                                     value={remainingMonthlyBudget}
            //                                     text={currencyFormatter(remainingMonthlyBudget)}
            //                                 />
            //                                 {/* <CircularProgressWithLabel 
            //                                     value={(remainingMonthlyBudget / monthlyBudget) * 100} 
            //                                     text={currencyFormatter(remainingMonthlyBudget)} /> */}
            //                             </Box>
            //                         </Stack>
            //                     </Paper>
            //                 </Grid>
            //                 <Grid item flexGrow={1} paddingLeft={1}>
            //                     <Paper sx={{height:"100%", padding:2}}>
            //                         <Stack height="100%">
            //                             <Typography variant="h6" align="center">
            //                                 Daily Budget
            //                             </Typography>
            //                             <Box height="100%" display="flex" justifyContent="center" alignItems="center">
            //                                 <CircularProgressbar
            //                                     minValue={0}
            //                                     maxValue={dailyBudget}
            //                                     value={remainingDailyBudget}
            //                                     text={currencyFormatter(remainingDailyBudget)}
            //                                     styles={buildStyles({
            //                                         pathColor: `#86608E`
            //                                     })}
            //                                 />
            //                                 {/* <CircularProgressWithLabel 
            //                                     value={(remainingDailyBudget / dailyBudget) * 100} 
            //                                     text={currencyFormatter(remainingDailyBudget)} /> */}
            //                             </Box>
            //                         </Stack>
            //                     </Paper>
            //                 </Grid>
            //             </Grid>
            //             <Paper sx={{height:"100%"}}>
            //                 <Box height="100%" padding={2}>
            //                     <ResponsiveContainer>
            //                         <BarChart
            //                             data={chartData}
            //                             margin={{left:20}}
            //                         >
            //                             <CartesianGrid strokeDasharray="3 3" />
            //                             <XAxis dataKey="date" tickFormatter={(value) => shortDate(value)} />
            //                             <YAxis tickFormatter={(value) => currencyFormatter(value)} />
            //                             <Tooltip separator=": " formatter={(value) => currencyFormatter(value as number)} labelFormatter={(label) => shortDate(label)} />
            //                             <Legend />
            //                             <Bar name="Daily Spending" dataKey="amount" fill="#d93511" />
            //                         </BarChart>
            //                     </ResponsiveContainer>
            //                 </Box>
            //             </Paper>
            //         </Stack>
            //     </Grid>
            //     <Grid item xs={4} paddingLeft={1}>
            //         <Stack height="100%" spacing={2}>
            //             <Paper sx={{height:"100%"}}>
            //                 <RecentExpenses expenses={expenses} setExpenses={setExpenses} />
            //             </Paper>
            //             <Paper sx={{height:"100%"}}>
            //                 <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%" padding={2}>
            //                     <Stack>
            //                         <Typography variant="h6">
            //                             Net Worth
            //                         </Typography>
            //                         <Typography variant="h5">
            //                             {currencyFormatter(netWorth)}
            //                         </Typography>
            //                     </Stack>
            //                     <Stack>
            //                         <Typography variant="subtitle1">
            //                             Assets
            //                         </Typography>
            //                         <Typography variant="h5">
            //                             {currencyFormatter(totalAssetsValue)}
            //                         </Typography>
            //                     </Stack>
            //                     <Stack>
            //                         <Typography variant="subtitle1">
            //                             Debts
            //                         </Typography>
            //                         <Typography variant="h5">
            //                             {currencyFormatter(totalDebtsAmount)}
            //                         </Typography>
            //                     </Stack>
            //                 </Box>
            //             </Paper>
            //         </Stack>
            //     </Grid>
            // </Grid>
        )
    }
}

export default Dashboard;
