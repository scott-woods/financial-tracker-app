import { useEffect, useState } from "react"
import { calculateAssetsValues, calculateDebtsAmount, calculateNetWorth } from "../../tools/valueCalculators"
import { Box, Collapse, Divider, LinearProgress, List, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material"
import { currencyFormatter } from "../../tools/currencyFormatter"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

interface INetWorthOverviewProps {
    assets:any[]
    debts:any[]
}

const NetWorthOverview = (props:INetWorthOverviewProps) => {

    const [netWorth, setNetWorth] = useState(0)
    const [totalAssetsValue, setTotalAssetsValue] = useState(0)
    const [totalLiquidAssetsValue, setTotalLiquidAssetsValue] = useState(0)
    const [totalNonLiquidAssetsValue, setTotalNonLiquidAssetsValue] = useState(0)
    const [totalDebtsAmount, setTotalDebtsAmount] = useState(0)
    
    const [assetsOpen, setAssetsOpen] = useState(false)
    const [debtsOpen, setDebtsOpen] = useState(false)

    const handleAssetsClick = () => {
        setAssetsOpen(!assetsOpen)
    }

    const handleDebtsClicked = () => {
        setDebtsOpen(!debtsOpen)
    }

    useEffect(() => {
        let { newTotalAssetsValue, newTotalLiquidAssetsValue, newTotalNonLiquidAssetsValue } = calculateAssetsValues(props.assets)
        let newTotalDebtsAmount = calculateDebtsAmount(props.debts)
        let newNetWorth = calculateNetWorth(props.assets, props.debts)

        setTotalAssetsValue(newTotalAssetsValue)
        setTotalLiquidAssetsValue(newTotalLiquidAssetsValue)
        setTotalNonLiquidAssetsValue(newTotalNonLiquidAssetsValue)
        setTotalDebtsAmount(newTotalDebtsAmount)
        setNetWorth(newNetWorth)
    }, [props.assets, props.debts])

    return (
        <Box display="flex" flexDirection="column" height="100%" gap={1}>
            <Typography variant="h6">
                Financial Profile
            </Typography>
            <Stack>
                <Typography variant="h6" fontWeight="lighter">
                    Net Worth
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    {currencyFormatter(netWorth)}
                </Typography>
            </Stack>
            <Divider />
            <Stack>
                <Typography variant="h6" fontWeight="lighter">
                    Assets
                </Typography>
                <List disablePadding>
                    <ListItemButton onClick={handleAssetsClick} disableGutters>
                        <Box display="flex" width="100%" height="100%" justifyContent="space-between" paddingRight={2}>
                            <Typography variant="body1" fontWeight="bold" alignSelf="center">
                                Total
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" alignSelf="center">
                                {currencyFormatter(totalAssetsValue)}
                            </Typography>
                        </Box>
                        {assetsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={assetsOpen} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <Box display="flex" width="100%" height="100%" justifyContent="space-between" paddingX={2}>
                                <Typography variant="body1" alignSelf="center">
                                    Liquid
                                </Typography>
                                <Typography variant="body1" alignSelf="center">
                                    {currencyFormatter(totalLiquidAssetsValue)}
                                </Typography>
                            </Box>
                            <Box display="flex" width="100%" height="100%" justifyContent="space-between" paddingX={2}>
                                <Typography variant="body1" alignSelf="center">
                                    Non-Liquid
                                </Typography>
                                <Typography variant="body1" alignSelf="center">
                                    {currencyFormatter(totalNonLiquidAssetsValue)}
                                </Typography>
                            </Box>
                        </List>
                    </Collapse>
                </List>
            </Stack>
            <Divider />
            <Stack>
                <Typography variant="h6" fontWeight="lighter">
                    Debts
                </Typography>
                <List disablePadding>
                    <ListItemButton onClick={handleDebtsClicked} disableGutters>
                        <Box display="flex" width="100%" height="100%" justifyContent="space-between" paddingRight={2}>
                            <Typography variant="body1" fontWeight="bold" alignSelf="center">
                                Total
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" alignSelf="center">
                                {currencyFormatter(totalDebtsAmount)}
                            </Typography>
                        </Box>
                        {debtsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </List>
            </Stack>
        </Box>
    )
}

export default NetWorthOverview