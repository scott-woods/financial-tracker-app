import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import Loading from "../components/Loading";
import { Box, Stack } from "@mui/system";
import { Collapse, Divider, Grid, List, ListItemButton, Paper, Typography } from "@mui/material";
import SavingsGoalEditor from "../components/ManageSavingsGoals/SavingsGoalEditor";
import axios from "axios";
import { currencyFormatter } from "../tools/currencyFormatter";
import { calculateDailyBudget, calculateMonthlyBudget } from "../tools/budgetCalculators";
import { calculateTotalRecurringExpenses, calculateTotalRecurringIncome, calculateTotalRecurringInvestments } from "../tools/spendingCalculators";
import SavingsGoalResults from "../components/ManageSavingsGoals/SavingsGoalResults";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ManageSavingsGoals = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [userMetadata, setUserMetadata] = useState<any | null | undefined>(null)
    const [savingsGoal, setSavingsGoal] = useState(0)
    const [totalRecurringIncome, setTotalRecurringIncome] = useState(0)
    const [totalRecurringInvestments, setTotalRecurringInvestments] = useState(0)
    const [fromLiquidInvestments, setFromLiquidInvestments] = useState(0)
    const [notFromLiquidInvestments, setNotFromLiquidInvestments] = useState(0)
    const [totalRecurringExpenses, setTotalRecurringExpenses] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [investmentsOpen, setInvestmentsOpen] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedPage(3))
        getData()
    }, [])

    useEffect(() => {
        if (userMetadata) {
            setSavingsGoal(userMetadata.savingsGoal)
        }
    }, [userMetadata])

    const getData = async () => {
        try {
            setIsLoading(true)

            const [userMetadataRes, recurringIncomeRes, recurringInvestmentsRes, recurringExpensesRes] = await Promise.all([
                axios.get(`/api/v1/Users`),
                axios.get(`/api/v1/RecurringIncomes`),
                axios.get(`/api/v1/RecurringInvestments`),
                axios.get(`/api/v1/RecurringExpenses`)
            ])

            let totalRecurringIncome = calculateTotalRecurringIncome(recurringIncomeRes.data)
            let totalRecurringInvestments = calculateTotalRecurringInvestments(recurringInvestmentsRes.data)
            let fromLiquidInvestments = calculateTotalRecurringInvestments(recurringInvestmentsRes.data.filter((d:any) => d.isFromLiquid))
            let notFromLiquidInvestments = calculateTotalRecurringInvestments(recurringInvestmentsRes.data.filter((d:any) => !d.isFromLiquid))
            let totalRecurringExpenses = calculateTotalRecurringExpenses(recurringExpensesRes.data)

            setTotalRecurringIncome(totalRecurringIncome)
            setTotalRecurringInvestments(totalRecurringInvestments)
            setFromLiquidInvestments(fromLiquidInvestments)
            setNotFromLiquidInvestments(notFromLiquidInvestments)
            setTotalRecurringExpenses(totalRecurringExpenses)
            setUserMetadata(userMetadataRes.data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleInvestmentsClick = () => {
        setInvestmentsOpen(!investmentsOpen)
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <Grid container padding={3} spacing={3}>
                <Grid item xs={12} md={12} lg={3} xl={3}>
                    <Paper sx={{padding:2}}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Typography variant="h6">
                                Savings
                            </Typography>
                            <Stack>
                                <Typography variant="body1" fontWeight="lighter">
                                    Recurring Income
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {currencyFormatter(totalRecurringIncome)}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="body1" fontWeight="lighter">
                                    Recurring Investments
                                </Typography>
                                    <List disablePadding>
                                        <ListItemButton onClick={handleInvestmentsClick} disableGutters>
                                            <Box display="flex" width="100%" height="100%" justifyContent="space-between" paddingRight={2}>
                                                <Typography variant="h5" fontWeight="bold" alignSelf="center">
                                                    {currencyFormatter(totalRecurringInvestments)}
                                                </Typography>
                                            </Box>
                                            {investmentsOpen ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={investmentsOpen} timeout="auto" unmountOnExit>
                                            <List disablePadding>
                                                <Box display="flex" width="100%" height="100%" justifyContent="space-between" paddingX={2}>
                                                    <Typography variant="body1" alignSelf="center">
                                                        From Income
                                                    </Typography>
                                                    <Typography variant="body1" alignSelf="center">
                                                        {currencyFormatter(fromLiquidInvestments)}
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" width="100%" height="100%" justifyContent="space-between" paddingX={2}>
                                                    <Typography variant="body1" alignSelf="center">
                                                        Not From Income
                                                    </Typography>
                                                    <Typography variant="body1" alignSelf="center">
                                                        {currencyFormatter(notFromLiquidInvestments)}
                                                    </Typography>
                                                </Box>
                                            </List>
                                        </Collapse>
                                    </List>
                                {/* <Typography variant="h5" fontWeight="bold">
                                    {currencyFormatter(totalRecurringInvestments)}
                                </Typography> */}
                            </Stack>
                            <Stack>
                                <Typography variant="body1" fontWeight="lighter">
                                    Recurring Expenses
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {currencyFormatter(totalRecurringExpenses)}
                                </Typography>
                            </Stack>
                            <Divider />
                            <Stack>
                                <Typography variant="h6" fontWeight="lighter">
                                    Total Monthly Savings
                                </Typography>
                                <Typography variant="subtitle2" fontWeight="lighter" fontStyle="italic">
                                    before other Expenses
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {currencyFormatter(totalRecurringIncome - totalRecurringExpenses + notFromLiquidInvestments)}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6" fontWeight="lighter">
                                    Liquid Monthly Savings
                                </Typography>
                                <Typography variant="subtitle2" fontWeight="lighter" fontStyle="italic">
                                    before other Expenses
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {currencyFormatter(totalRecurringIncome - totalRecurringExpenses - fromLiquidInvestments)}
                                </Typography>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={9} xl={9} display="flex" flexDirection="column" gap={3}>
                    <Paper sx={{padding:2}}>
                        <SavingsGoalEditor
                            userMetadata={userMetadata}
                            setUserMetadata={setUserMetadata}
                            savingsGoal={savingsGoal}
                            setSavingsGoal={setSavingsGoal}
                            totalRecurringIncome={totalRecurringIncome}
                            totalRecurringExpenses={totalRecurringExpenses}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    </Paper>
                    <Paper sx={{padding:2}}>
                        <SavingsGoalResults
                            savingsGoal={savingsGoal}
                            totalRecurringIncome={totalRecurringIncome}
                            totalRecurringExpenses={totalRecurringExpenses}
                            isEditing={isEditing}
                        />
                    </Paper>
                </Grid>
            </Grid>
            // <Grid container padding={4}>
            //     <Grid item xs={5} marginRight={2}>
            //         <Paper sx={{padding:2}}>
            //             <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
            //                 <Stack>
            //                     <Typography variant="body1" fontWeight="lighter" fontStyle="italic">
            //                         Given your recurring Income and Expenses, your Monthly Spending should be:
            //                     </Typography>
            //                     <Typography variant="h4">
            //                         {currencyFormatter(monthlyBudget)}
            //                     </Typography>
            //                 </Stack>
            //                 <Stack>
            //                     <Typography variant="body1" fontWeight="lighter" fontStyle="italic">
            //                         With this Monthly Budget, your Average Daily Spending Goal for this month is:
            //                     </Typography>
            //                     <Typography variant="h4">
            //                         {currencyFormatter(dailyBudget)}
            //                     </Typography>
            //                 </Stack>
            //             </Box>
            //         </Paper>
            //     </Grid>
            //     <Grid item flexGrow={1}>
            //         <Paper sx={{height:"100%"}}>
            //             <SavingsGoalEditor />
            //         </Paper>
            //     </Grid>
            // </Grid>
        )
    }
}

export default ManageSavingsGoals;