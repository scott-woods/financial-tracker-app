import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Paper, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { currencyFormatter } from "../tools/currencyFormatter";
import AssetsAndDebtsEditor from "../components/AssetsAndDebts/AssetsAndDebtsEditor";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loading from "../components/Loading";


const AssetsAndDebts = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [assets, setAssets] = useState<any[]>([])
    const [debts, setDebts] = useState<any[]>([])
    const [reports, setReports] = useState<any[]>([])
    const [totalAssetsValue, setTotalAssetsValue] = useState(0)
    const [liquidAssetsValue, setLiquidAssetsValue] = useState(0)
    const [nonLiquidAssetsValue, setNonLiquidAssetsValue] = useState(0)
    const [totalDebtsAmount, setTotalDebtsAmount] = useState(0)
    const [netWorth, setNetWorth] = useState(0)
    const [chartTabIndex, setChartTabIndex] = useState(0)
    const [chartData, setChartData] = useState<any[]>([])

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

    useEffect(() => {
        let newChartData = reports.map((report:any) => {
            return {
                netWorth: report.totalAssets - report.totalDebts,
                totalAssets: report.totalAssets,
                totalDebts: report.totalDebts,
                date: Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }).format(new Date(report.date.toString()))
            }
        })

        if (newChartData) {
            setChartData(newChartData)
        }
    }, [reports])

    const getData = async () => {
        try {
            setIsLoading(true)

            const [assetsRes, debtsRes, reportsRes] = await Promise.all([
                axios.get(`/api/v1/Assets`),
                axios.get(`/api/v1/Debts`),
                axios.get(`/api/v1/NetWorthReports`)
            ])

            //set states
            setAssets(assetsRes.data)
            setDebts(debtsRes.data)
            setReports(reportsRes.data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const addNetWorthReport = async () => {
        let newReport = {
            date: new Date(),
            liquidAssets: liquidAssetsValue,
            nonLiquidAssets: nonLiquidAssetsValue,
            totalAssets: totalAssetsValue,
            totalDebts: totalDebtsAmount,
            previousReport: null
        }

        await axios
            .post(`/api/v1/NetWorthReports`, newReport)
            .then((res) => {
                setReports((prevData:any) => [...prevData, res.data])
            })
    }

    const handleChartTabChange = (event: React.SyntheticEvent, index: number) => {
        setChartTabIndex(index)
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <Grid container padding={4} height="100%">
                <Grid item xs={5} paddingRight={1}>
                    <Stack height="100%" spacing={2}>
                        <Paper sx={{padding:2}}>
                            <Stack>
                                <Typography variant="h5">
                                    Net Worth
                                </Typography>
                                <Typography variant="h3" fontWeight="bold">
                                    {currencyFormatter(netWorth)}
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="light" marginTop={2}>
                                    Assets
                                </Typography>
                                <Typography variant="h5">
                                    {currencyFormatter(totalAssetsValue)}
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="light" marginTop={2}>
                                    Debts
                                </Typography>
                                <Typography variant="h5">
                                    {currencyFormatter(totalDebtsAmount)}
                                </Typography>
                            </Stack>
                        </Paper>
                        <Paper sx={{height:"100%"}}>
                            <Stack height="100%">
                                <Box height="100%" padding={2}>
                                    <ResponsiveContainer>
                                        <BarChart
                                            data={chartData}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" reversed hide={true} />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="netWorth" fill="#11d935" />
                                            <Bar label="Assets" dataKey="totalAssets" fill="#3511d9" />
                                            <Bar label="Debts" dataKey="totalDebts" fill="#d93511" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>
                <Grid item xs={7} paddingLeft={1}>
                    <Paper sx={{height:'100%'}}>
                        <AssetsAndDebtsEditor
                            assets={assets}
                            debts={debts}
                            setAssets={setAssets}
                            setDebts={setDebts}
                            addNetWorthReport={addNetWorthReport}
                        />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default AssetsAndDebts;