export const calculateMonthlyBudget = (totalRecurringIncome:any, totalRecurringExpenses:any, savingsGoal:number) => {
    let newMonthlyBudget = 0
    newMonthlyBudget = totalRecurringIncome - totalRecurringExpenses
    if (savingsGoal) {
        newMonthlyBudget -= savingsGoal
    }

    return parseFloat(newMonthlyBudget.toFixed(2))
}

export const calculateRemainingMonthlyBudget = (monthlyBudget:number, expenses:any) => {
    let newRemainingMonthlyBudget = 0

    if (monthlyBudget) {
        newRemainingMonthlyBudget += monthlyBudget
    }
    if (expenses.length > 0) {
        const today = new Date()
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1, 0)
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
        let expensesThisMonth = expenses.filter((e:any) => {
            const date = new Date(e.date)
            return (
                date >= firstDay &&
                date <= lastDay
            )
        })
        if (expensesThisMonth.length > 0) {
            let totalExpenses = expensesThisMonth.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
            newRemainingMonthlyBudget -= totalExpenses
        }
    }

    return parseFloat(newRemainingMonthlyBudget.toFixed(2))
}

export const calculateDailyBudget = (monthlyBudget:number) => {
    let now = new Date()
    let daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    return monthlyBudget / daysInMonth
}

export const calculateRemainingDailyBudget = (dailyBudget:number, expensesToday:number) => {
    let newRemainingDailyBudget = 0

    newRemainingDailyBudget += dailyBudget
    newRemainingDailyBudget -= expensesToday

    return parseFloat(newRemainingDailyBudget.toFixed(2))
}