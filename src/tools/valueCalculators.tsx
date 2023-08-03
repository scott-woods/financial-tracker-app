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

    return newNetWorth
}