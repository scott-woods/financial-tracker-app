import { AppBar, Box, Checkbox, Grid, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tabs, Toolbar, Typography } from "@mui/material";
import IncomeAndExpensesOverview from "../components/IncomeAndExpenses/IncomeAndExpensesOverview";
import React, { useState } from "react";
import IncomeTab from "../components/IncomeAndExpenses/IncomeTab";
import ExpensesTab from "../components/IncomeAndExpenses/ExpensesTab";
import InvestmentsTab from "../components/IncomeAndExpenses/InvestmentsTab";

const IncomeAndExpenses = () => {

    //states
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, index: number) => {
        setTabIndex(index)
    }

    return (
        <Grid container spacing={4} padding={4} sx={{height:'100%', alignContent:'flex-start'}}>
            <Grid item xs={12}>
                <IncomeAndExpensesOverview />
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
                            <IncomeTab show={tabIndex === 0} />
                            <InvestmentsTab show={tabIndex === 1} />
                            <ExpensesTab show={tabIndex === 2} />
                        </Box>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default IncomeAndExpenses;