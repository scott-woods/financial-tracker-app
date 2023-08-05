export const calculateNetWorth = (assets:any, debts:any) => {
    let newNetWorth = 0
    
    if (assets.length > 0) {
        let totalAssets = assets.map((a:any) => a.value).reduce((prev:any, next:any) => prev + next)
        newNetWorth += totalAssets
    }
    if (debts.length > 0) {
        let totalDebts = debts.map((d:any) => d.amount).reduce((prev:any, next:any) => prev + next)
        newNetWorth -= totalDebts
    }      

    return parseFloat(newNetWorth.toFixed(2))
}

export const calculateAssetsValues = (assets:any) => {
    let newTotalAssetsValue = 0
    let newTotalLiquidAssetsValue = 0
    let newTotalNonLiquidAssetsValue = 0

    assets.forEach((asset:any) => {
        newTotalAssetsValue += asset.value
        if (asset.isLiquid) {
            newTotalLiquidAssetsValue += asset.value
        }
        else if (!asset.isLiquid) {
            newTotalNonLiquidAssetsValue += asset.value
        }
    })

    newTotalAssetsValue = parseFloat(newTotalAssetsValue.toFixed(2))
    newTotalLiquidAssetsValue = parseFloat(newTotalLiquidAssetsValue.toFixed(2))
    newTotalNonLiquidAssetsValue = parseFloat(newTotalNonLiquidAssetsValue.toFixed(2))

    return { newTotalAssetsValue, newTotalLiquidAssetsValue, newTotalNonLiquidAssetsValue }
}

export const calculateDebtsAmount = (debts:any) => {
    let newTotalDebtsAmount = 0

    if (debts.length > 0) {
        newTotalDebtsAmount = debts.map((d:any) => d.amount).reduce((prev:any, next:any) => prev + next)
    }

    return parseFloat(newTotalDebtsAmount.toFixed(2))
}