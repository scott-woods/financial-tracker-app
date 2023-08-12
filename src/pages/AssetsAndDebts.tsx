import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Paper, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { currencyFormatter } from "../tools/currencyFormatter";
import AssetsAndDebtsEditor from "../components/AssetsAndDebts/AssetsAndDebtsEditor";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loading from "../components/Loading";
import NetWorthOverview from "../components/Dashboard/NetWorthOverview";


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
        let newChartData = reports.sort((a, b) => {
            let aDate = new Date(a.date)
            let bDate = new Date(b.date)
            return aDate.getTime() - bDate.getTime()
        }).map((report:any) => {
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
            <Grid container padding={3} spacing={3}>
                <Grid item xs={12} md={12} lg={6} xl={6} display="flex" flexDirection="column" gap={3}>
                    <Paper sx={{padding:2}}>
                        <NetWorthOverview
                            assets={assets}
                            debts={debts}
                        />
                    </Paper>
                    <Paper sx={{padding:2, height:"50vh"}}>
                        <Box display="flex" flexDirection="column" height="100%" gap={2}>
                            <Typography variant="h6">
                                Net Worth Trends
                            </Typography>
                            <ResponsiveContainer>
                                <LineChart
                                    data={chartData}
                                    margin={{left:20}}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" hide={true} />
                                    <YAxis tickFormatter={(value) => currencyFormatter(value)} />
                                    <Tooltip separator=": " formatter={(value) => currencyFormatter(value as number)} />
                                    <Legend />
                                    <Line type="monotone" dataKey="netWorth" name="Net Worth" stroke="#11d935" />
                                    <Line type="monotone" dataKey="totalAssets" name="Assets" stroke="#3511d9" />
                                    <Line type="monotone" dataKey="totalDebts" name="Debts" stroke="#d93511" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={6} xl={6} display="flex" flexDirection="column" gap={3}>
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