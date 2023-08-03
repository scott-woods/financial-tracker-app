export const calculateExpensesToday = (expenses:any) => {
    let newExpensesToday = 0

    if (expenses.length > 0) {
        let now = new Date()
        let dailyExpenses = expenses
            .filter((e:any) => {
                let date = new Date(e.date)
                return (
                    date.getDate() === now.getDate() &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                )
            })
        if (dailyExpenses.length > 0) {
            let totalDailyExpenses = dailyExpenses.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
            newExpensesToday = totalDailyExpenses
        }
    }

    return newExpensesToday
}