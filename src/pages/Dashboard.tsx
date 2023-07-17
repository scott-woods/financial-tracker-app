import { AppBar, Box, CircularProgress, Container, Divider, Grid, Paper, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthRequired";
import ExpensesTab from "../components/IncomeAndExpenses/ExpensesTab";
import IncomeTab from "../components/IncomeAndExpenses/IncomeTab";
import InvestmentsTab from "../components/IncomeAndExpenses/InvestmentsTab";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";

const Dashboard = () => {
    
    const user = useContext(AuthContext);

    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

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
                                <Paper sx={{padding:2, height:'100%'}}>
                                    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                        <Typography variant="h6">
                                            Remaining Monthly Budget
                                        </Typography>
                                        <CircularProgressWithLabel value={100} text="$1,000" />
                                    </Box>
                                </Paper>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Paper sx={{padding:2, height:'100%'}}>
                                    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                        <Typography variant="h6">
                                            Remaining Daily Budget FEEF
                                        </Typography>
                                        <CircularProgressWithLabel value={75} text="$30" />
                                    </Box>
                                </Paper> 
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Paper sx={{padding:2, height:'100%'}}>
                                    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                        <Typography variant="h6">
                                            Remaining Daily Budget FEEF
                                        </Typography>
                                        <CircularProgressWithLabel value={75} text="$30" />
                                    </Box>
                                </Paper> 
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item lg={5}>
                        <Box display="flex-block" justifyContent="center" sx={{height:'100%'}}>
                            <Paper sx={{padding:2, height:'100%'}}>
                                <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                    <Typography variant="h6">
                                        Net Worth
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                {/* <Grid container spacing={3} alignItems="stretch">
                    <Grid item lg={6}>
                        <Box display="flex" justifyContent="center">
                            <Paper sx={{padding:2, height:'100%'}}>
                                <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                    <Typography variant="h6">
                                        Remaining Monthly Budget
                                    </Typography>
                                    <CircularProgressWithLabel value={100} text="$1,000" />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item lg={6}>
                        <Box display="flex" justifyContent="center">
                            <Paper sx={{padding:2, height:'100%'}}>
                                <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                    <Typography variant="h6">
                                        Remaining Daily Budget FEEF
                                    </Typography>
                                    <CircularProgressWithLabel value={75} text="$30" />
                                </Box>
                            </Paper> 
                        </Box>
                    </Grid>
                </Grid> */}
            </Grid>
            <Grid item lg={12}>
                <Grid container spacing={4} alignItems="stretch">
                    <Grid item lg={7}>
                        <Paper sx={{padding:2, height:'100%'}}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Typography variant="h1">
                                    Chart
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={5}>
                        <Stack display={"flex"} direction="row" height={"100%"} justifyContent={"space-between"}>
                            <Paper sx={{padding:2, height:'100%', width:'100%'}}>
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

export default Dashboard;