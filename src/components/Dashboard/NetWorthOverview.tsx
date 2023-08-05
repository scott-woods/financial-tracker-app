import { useEffect, useState } from "react"
import { calculateAssetsValues, calculateDebtsAmount, calculateNetWorth } from "../../tools/valueCalculators"
import { Box, Stack, Typography } from "@mui/material"
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
            <Stack>
                <Typography variant="body1">
                    Net Worth
                </Typography>
                <Typography variant="h4">
                    {currencyFormatter(netWorth)}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="body1">
                    Assets
                </Typography>
                <Typography variant="h4">
                    {currencyFormatter(totalAssetsValue)}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="body1">
                    Debts
                </Typography>
                <Typography variant="h4">
                    {currencyFormatter(totalDebtsAmount)}
                </Typography>
            </Stack>
        </Box>
    )
}

export default NetWorthOverview