import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { currencyFormatter } from "../tools/currencyFormatter";
import AssetsAndDebtsEditor from "../components/AssetsAndDebts/AssetsAndDebtsEditor";

const AssetsAndDebts = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [assets, setAssets] = useState<any[]>([])
    const [debts, setDebts] = useState<any[]>([])
    const [totalAssetsValue, setTotalAssetsValue] = useState(0)
    const [liquidAssetsValue, setLiquidAssetsValue] = useState(0)
    const [nonLiquidAssetsValue, setNonLiquidAssetsValue] = useState(0)
    const [totalDebtsAmount, setTotalDebtsAmount] = useState(0)
    const [netWorth, setNetWorth] = useState(0)

    useEffect(() => {
        dispatch(setSelectedPage(2))
        getData()
    }, [])

    useEffect(() => {
        let newTotalAssetsValue = 0
        let newLiquidAssetsValue = 0
        let newNonLiquidAssetsValue = 0
        let newTotalDebtsAmount = 0
        let newNetWorth = 0

        assets.forEach(a => {
            newTotalAssetsValue += a.value
            if (a.isLiquid) {
                newLiquidAssetsValue += a.value
            }
            else if (!a.isLiquid) {
                newNonLiquidAssetsValue += a.value
            }
        })
        if (debts.length > 0) {
            newTotalDebtsAmount = debts.map(d => d.amount).reduce((prev:any, next:any) => prev + next)
        }

        newNetWorth = newTotalAssetsValue - newTotalDebtsAmount

        setTotalAssetsValue(newTotalAssetsValue)
        setLiquidAssetsValue(newLiquidAssetsValue)
        setNonLiquidAssetsValue(newNonLiquidAssetsValue)
        setTotalDebtsAmount(newTotalDebtsAmount)
        setNetWorth(newNetWorth)
    }, [assets, debts])

    const getData = async () => {
        try {
            setIsLoading(true)

            const [assetsRes, debtsRes] = await Promise.all([
                axios.get(`/api/v1/Assets`),
                axios.get(`/api/v1/Debts`),
            ])

            //set states
            setAssets(assetsRes.data)
            setDebts(debtsRes.data)
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
            <div>Loading...</div>
        )
    }
    else {
        return (
            <Grid container padding={4} height="100%">
                <Grid item lg={6} paddingRight={1}>
                    <Box height="100%" display="flex" flexDirection="column">
                        <Grid container flexGrow={1} paddingBottom={1}>
                            <Grid item xs={5} paddingRight={1}>
                                <Paper elevation={12} sx={{padding:2, height:'100%'}}>
                                    <Box height="100%" display="flex" flexDirection="column">
                                        <Typography variant="h6" align="center">
                                            Net Worth
                                        </Typography>
                                        <Box display="flex" height="100%" justifyContent="center" alignItems="center">
                                            <Typography variant="h4" align="center">
                                                {currencyFormatter(netWorth)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {/* <Grid container border={4} height="100%">
                                        <Grid item xs={12}>
                                            <Typography variant="h6" align="center">
                                                Net Worth
                                            </Typography>
                                            <Box display="flex" height="100%" justifyContent="center" alignItems="center">
                                                <Typography variant="h4">
                                                    {currencyFormatter(netWorth)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid> */}
                                    {/* <Box display="flex" flexWrap="wrap" justifyContent="center" alignContent="flex-start" height='100%'>
                                        <Typography width='100%' variant="h6">
                                            Net Worth
                                        </Typography>
                                        <Typography>
                                            {currencyFormatter(netWorth)}
                                        </Typography>
                                    </Box> */}
                                </Paper>
                            </Grid>
                            <Grid item xs={7} paddingLeft={1}>
                                <Stack spacing={2} height='100%'>
                                    <Paper sx={{padding:2, height:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography variant="h6" align="center">
                                                    Total Assets
                                                </Typography>
                                                <Box display="flex" height="100%" justifyContent="center" alignItems="center">
                                                    <Typography>
                                                        {currencyFormatter(totalAssetsValue)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="h6" align="center">
                                                    Liquid Assets
                                                </Typography>
                                                <Box display="flex" height="100%" justifyContent="center" alignItems="center">
                                                    <Typography>
                                                        {currencyFormatter(liquidAssetsValue)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper sx={{padding:2, height:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography variant="h6" align="center">
                                                    Total Debts
                                                </Typography>
                                                <Box display="flex" height="100%" justifyContent="center" alignItems="center">
                                                    <Typography>
                                                        {currencyFormatter(totalDebtsAmount)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Box flexGrow={8} paddingTop={1}>
                            <Paper sx={{padding:2, height:"100%"}}>
                                    <Box>
                                        <Typography>
                                            Chart
                                        </Typography>
                                    </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={6} paddingLeft={1}>
                    <Paper sx={{height:'100%'}}>
                        <AssetsAndDebtsEditor assets={assets} debts={debts} setAssets={setAssets} setDebts={setDebts} />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default AssetsAndDebts;