import { useEffect, useState } from "react"
import { calculateAssetsValues, calculateDebtsAmount, calculateNetWorth } from "../../tools/valueCalculators"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { currencyFormatter } from "../../tools/currencyFormatter"

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
        <Box display="flex" flexDirection="column" justifyContent="space-evenly" height="100%">
            <Stack spacing={1}>
                <Typography variant="h6">
                    Net Worth
                </Typography>
                <Divider />
                <Typography variant="h3" fontWeight="bold">
                    {currencyFormatter(netWorth)}
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h6">
                    Assets
                </Typography>
                <Divider />
                <Typography variant="h4" fontWeight="bold">
                    {currencyFormatter(totalAssetsValue)}
                </Typography>
                <Stack>
                    <Typography variant="subtitle2">
                        Liquid
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {currencyFormatter(totalLiquidAssetsValue)}
                    </Typography>
                </Stack>
                <Stack>
                    <Typography variant="subtitle2">
                        Non-Liquid
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {currencyFormatter(totalNonLiquidAssetsValue)}
                    </Typography>
                </Stack>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h6">
                    Debts
                </Typography>
                <Divider />
                <Typography variant="h4" fontWeight="bold">
                    {currencyFormatter(totalDebtsAmount)}
                </Typography>
            </Stack>
        </Box>
    )
}

export default NetWorthOverview