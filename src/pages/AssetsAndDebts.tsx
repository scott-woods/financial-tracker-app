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
                        <Grid container flexGrow={1}>
                            <Grid item xs={6}>
                                <Paper elevation={12} sx={{padding:2, height:'100%'}}>
                                    <Box display="flex" flexWrap="wrap" justifyContent="center" alignContent="flex-start" height='100%'>
                                        <Typography width='100%' variant="h6">
                                            Net Worth
                                        </Typography>
                                        <Typography>
                                            {currencyFormatter(netWorth)}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={2} height='100%' flexGrow={1}>
                                    <Paper sx={{padding:2, height:'100%'}}>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography>
                                                Total Assets: {currencyFormatter(totalAssetsValue)}
                                            </Typography>
                                            <Typography>
                                                Liquid Assets
                                            </Typography>
                                        </Box>
                                    </Paper>
                                    <Paper sx={{padding:2, height:'100%'}}>
                                        <Box>
                                            <Typography>
                                                Total Debts: {currencyFormatter(totalDebtsAmount)}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Paper sx={{padding:2, flexGrow:5}}>
                                <Box>
                                    <Typography>
                                        Chart
                                    </Typography>
                                </Box>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item lg={6} paddingLeft={1}>
                    <Paper sx={{height:'100%'}}>
                        <AssetsAndDebtsEditor assets={assets} debts={debts} setAssets={setAssets} />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default AssetsAndDebts;