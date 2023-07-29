import { AppBar, Box, Checkbox, Grid, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tabs, Toolbar, Typography } from "@mui/material";
import IncomeAndExpensesOverview from "../components/IncomeAndExpenses/IncomeAndExpensesOverview";
import React, { useEffect, useState } from "react";
import IncomeTab from "../components/IncomeAndExpenses/IncomeTab";
import ExpensesTab from "../components/IncomeAndExpenses/ExpensesTab";
import InvestmentsTab from "../components/IncomeAndExpenses/InvestmentsTab";
import axios from "axios";

const IncomeAndExpenses = () => {

    //states
    const [tabIndex, setTabIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [recurringIncomeList, setRecurringIncomeList] = useState([])
    const [recurringInvestmentList, setRecurringInvestmentList] = useState([])
    const [recurringExpenseList, setRecurringExpenseList] = useState([])
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalInvestments, setTotalInvestments] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)

            const [recurringIncomeRes, recurringInvestmentsRes, recurringExpensesRes] = await Promise.all([
                axios.get(`/api/v1/RecurringIncomes`),
                axios.get(`/api/v1/RecurringInvestments`),
                axios.get(`api/v1/RecurringExpenses`)
            ])

            const recurringIncome = recurringIncomeRes.data
            const recurringInvestments = recurringInvestmentsRes.data
            const recurringExpenses = recurringExpensesRes.data

            if (recurringIncome.length > 0) {
                setTotalIncome(recurringIncome.map((i:any) => i.amount).reduce((prev:any, next:any) => prev + next))
                setRecurringIncomeList(recurringIncome)
            }
            if (recurringInvestments.length > 0) {
                setTotalInvestments(recurringInvestments.map((i:any) => i.amount).reduce((prev:any, next:any) => prev + next))
                setRecurringInvestmentList(recurringInvestments)
            }
            if (recurringExpenses.length > 0) {
                setTotalExpenses(recurringExpenses.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next))
                setRecurringExpenseList(recurringExpenses)
            }
        }
        catch (error:any) {
            alert("Error occurred while getting data - " + error.message)
            console.error(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleTabChange = (event: React.SyntheticEvent, index: number) => {
        setTabIndex(index)
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <Grid container spacing={4} padding={4} sx={{height:'100%', alignContent:'flex-start'}}>
                <Grid item xs={12}>
                    <IncomeAndExpensesOverview 
                    totalIncome={totalIncome} 
                    totalInvestments={totalInvestments}
                    totalExpenses={totalExpenses} />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{display:'flex', flexGrow:1, minHeight:250}}>
                        <Stack sx={{width:'100%'}}>
                            <Tabs onChange={handleTabChange} value={tabIndex}>
                                <Tab label="Income"></Tab>
                                <Tab label="Investments"></Tab>
                                <Tab label="Expenses"></Tab>
                            </Tabs>
                            <Box sx={{flexGrow:1, padding:2}}>
                                <IncomeTab show={tabIndex === 0} recurringIncome={recurringIncomeList} />
                                <InvestmentsTab show={tabIndex === 1} />
                                <ExpensesTab show={tabIndex === 2} />
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default IncomeAndExpenses;