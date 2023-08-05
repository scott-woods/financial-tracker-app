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
import SavingsGoalResults from "../components/ManageSavingsGoals/SavingsGoalResults";

const ManageSavingsGoals = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [userMetadata, setUserMetadata] = useState<any | null | undefined>(null)
    const [savingsGoal, setSavingsGoal] = useState(0)
    const [totalRecurringIncome, setTotalRecurringIncome] = useState(0)
    const [totalRecurringExpenses, setTotalRecurringExpenses] = useState(0)
    const [isEditing, setIsEditing] = useState(false)

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

            const [userMetadataRes, recurringIncomeRes, recurringExpensesRes] = await Promise.all([
                axios.get(`/api/v1/Users`),
                axios.get(`/api/v1/RecurringIncomes`),
                axios.get(`/api/v1/RecurringExpenses`)
            ])

            let totalRecurringIncome = calculateTotalRecurringIncome(recurringIncomeRes.data)
            let totalRecurringExpenses = calculateTotalRecurringExpenses(recurringExpensesRes.data)

            setTotalRecurringIncome(totalRecurringIncome)
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

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <Grid container padding={4} gap={2}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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