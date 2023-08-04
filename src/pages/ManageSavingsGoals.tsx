import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import Loading from "../components/Loading";
import { Box, Stack } from "@mui/system";
import { Grid, Paper, Typography } from "@mui/material";
import SavingsGoalEditor from "../components/ManageSavingsGoals/SavingsGoalEditor";
import axios from "axios";
import { currencyFormatter } from "../tools/currencyFormatter";
import { calculateDailyBudget, calculateMonthlyBudget } from "../tools/budgetCalculators";
import { calculateTotalRecurringExpenses, calculateTotalRecurringIncome } from "../tools/spendingCalculators";

const ManageSavingsGoals = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [userMetadata, setUserMetadata] = useState<any | null | undefined>(null)
    const [recurringIncomes, setRecurringIncomes] = useState<any[]>([])
    const [recurringExpenses, setRecurringExpenses] = useState<any[]>([])
    const [monthlyBudget, setMonthlyBudget] = useState(0)
    const [dailyBudget, setDailyBudget] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedPage(3))
        getData()
    }, [])

    useEffect(() => {
        let totalRecurringIncome = calculateTotalRecurringIncome(recurringIncomes)
        let totalRecurringExpenses = calculateTotalRecurringExpenses(recurringExpenses)
        let newMonthlyBudget = calculateMonthlyBudget(totalRecurringIncome, totalRecurringExpenses, userMetadata)
        let newDailyBudget = calculateDailyBudget(newMonthlyBudget)

        setMonthlyBudget(newMonthlyBudget)
        setDailyBudget(newDailyBudget)
    }, [recurringIncomes, recurringExpenses])

    const getData = async () => {
        try {
            setIsLoading(true)

            const [userMetadataRes, recurringIncomeRes, recurringExpensesRes] = await Promise.all([
                axios.get(`/api/v1/Users`),
                axios.get(`/api/v1/RecurringIncomes`),
                axios.get(`/api/v1/RecurringExpenses`)
            ])

            setUserMetadata(userMetadataRes.data)
            setRecurringIncomes(recurringIncomeRes.data)
            setRecurringExpenses(recurringExpensesRes.data)
        }
        catch (error) {
            console.log(error)
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
            <Grid container padding={4}>
                <Grid item xs={5} marginRight={2}>
                    <Paper sx={{padding:2}}>
                        <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                            <Stack>
                                <Typography variant="body1" fontWeight="lighter" fontStyle="italic">
                                    Given your recurring Income and Expenses, your Monthly Spending should be:
                                </Typography>
                                <Typography variant="h4">
                                    {currencyFormatter(monthlyBudget)}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="body1" fontWeight="lighter" fontStyle="italic">
                                    With this Monthly Budget, your Average Daily Spending Goal for this month is:
                                </Typography>
                                <Typography variant="h4">
                                    {currencyFormatter(dailyBudget)}
                                </Typography>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item flexGrow={1}>
                    <Paper sx={{height:"100%"}}>
                        <SavingsGoalEditor />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default ManageSavingsGoals;