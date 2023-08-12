import { AppBar, Box, Checkbox, Grid, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tabs, Toolbar, Typography } from "@mui/material";
import IncomeAndExpensesOverview from "../components/IncomeAndExpenses/IncomeAndExpensesOverview";
import React, { useEffect, useState } from "react";
import IncomeTab from "../components/IncomeAndExpenses/IncomeTab";
import ExpensesTab from "../components/IncomeAndExpenses/ExpensesTab";
import InvestmentsTab from "../components/IncomeAndExpenses/InvestmentsTab";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import { timeframes } from "../timeframes";
import Loading from "../components/Loading";

const IncomeAndExpenses = () => {

    const dispatch = useDispatch()

    //states
    const [tabIndex, setTabIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [recurringIncomeList, setRecurringIncomeList] = useState([])
    const [recurringInvestmentList, setRecurringInvestmentList] = useState([])
    const [recurringExpenseList, setRecurringExpenseList] = useState([])

    useEffect(() => {
        dispatch(setSelectedPage(1))
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

            //set states
            setRecurringIncomeList(recurringIncomeRes.data)
            setRecurringInvestmentList(recurringInvestmentsRes.data)
            setRecurringExpenseList(recurringExpensesRes.data)
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
            <Loading />
        )
    }
    else {
        return (
            <Stack spacing={3} padding={3} sx={{height:'100%'}}>
                <Box>
                    <IncomeAndExpensesOverview
                    recurringIncomeList={recurringIncomeList}
                    recurringInvestmentList={recurringInvestmentList}
                    recurringExpenseList={recurringExpenseList}
                    />
                </Box>
                <Box height="100%">
                    <Paper sx={{display:'flex', height:"100%"}}>
                        <Stack sx={{width:'100%'}} height="100%">
                            <Tabs onChange={handleTabChange} value={tabIndex}>
                                <Tab label="Income"></Tab>
                                <Tab label="Investments"></Tab>
                                <Tab label="Expenses"></Tab>
                            </Tabs>
                            <Box display="flex" alignItems="center" height="100%" sx={{padding:2}}>
                                <IncomeTab
                                    show={tabIndex === 0}
                                    recurringIncome={recurringIncomeList}
                                    setRecurringIncome={setRecurringIncomeList}
                                />
                                <InvestmentsTab
                                    show={tabIndex === 1}
                                    investmentList={recurringInvestmentList}
                                    setRecurringInvestments={setRecurringInvestmentList}
                                />
                                <ExpensesTab
                                    show={tabIndex === 2}
                                    recurringExpenseList={recurringExpenseList}
                                    setRecurringExpenses={setRecurringExpenseList}
                                />
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        )
    }
}

export default IncomeAndExpenses;