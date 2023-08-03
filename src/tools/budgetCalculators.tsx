export const calculateMonthlyBudget = (recurringIncomes:any, recurringExpenses:any, userMetadata:any) => {
    let newMonthlyBudget = 0

    if (recurringIncomes.length > 0) {
        let totalRecurringIncome = recurringIncomes.map((i:any) => i.amount).reduce((prev:any, next:any) => prev + next)
        newMonthlyBudget += totalRecurringIncome
    }
    if (recurringExpenses.length > 0) {
        let totalRecurringExpenses = recurringExpenses.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
        newMonthlyBudget -= totalRecurringExpenses
    }
    if (userMetadata?.savingsGoal) {
        newMonthlyBudget -= userMetadata.savingsGoal
    }

    return newMonthlyBudget
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

    return newRemainingMonthlyBudget
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

    return newRemainingDailyBudget
}