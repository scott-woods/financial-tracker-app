import { timeframes } from "../timeframes"

const getNextValue = (next:any) => {
    let monthlyIndex = timeframes.find(t => t.label === "Monthly").value
    let yearlyIndex = timeframes.find(t => t.label === "Yearly").value

    switch (next.timeframe) {
        case monthlyIndex:
            return parseFloat(next.amount.toFixed(2))
        case yearlyIndex:
            return parseFloat((next.amount / 12).toFixed(2))
        default:
            return 0
    }
}

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

    return parseFloat(newExpensesToday.toFixed(2))
}

export const calculateExpensesThisMonth = (expenses:any) => {
    let newExpensesThisMonth = 0

    if (expenses.length > 0) {
        const today = new Date()
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1, 0)
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
        let expensesThisMonth = expenses
            .filter((e:any) => {
                let date = new Date(e.date)
                return (
                    date >= firstDay &&
                    date <= lastDay
                )
            })
        if (expensesThisMonth.length > 0) {
            let totalMonthlyExpenses = expensesThisMonth.map((e:any) => e.amount).reduce((prev:any, next:any) => prev + next)
            newExpensesThisMonth = totalMonthlyExpenses
        }
    }

    return parseFloat(newExpensesThisMonth.toFixed(2))
}

export const calculateTotalRecurringIncome = (recurringIncomes:any) => {
    let newTotalRecurringIncome = 0
    if (recurringIncomes.length > 0) {
        newTotalRecurringIncome = recurringIncomes.reduce((prev:any, next:any) => {
            let nextValue = getNextValue(next)
            return prev + nextValue
        }, 0)
    }

    return parseFloat(newTotalRecurringIncome.toFixed(2))
}

export const calculateTotalRecurringInvestments = (recurringInvestments:any) => {
    let newTotalRecurringInvestments = 0
    if (recurringInvestments.length > 0) {
        newTotalRecurringInvestments = recurringInvestments.reduce((prev:any, next:any) => {
            let nextValue = getNextValue(next)
            return prev + nextValue
        }, 0)
    }
    
    return parseFloat(newTotalRecurringInvestments.toFixed(2))
}

export const calculateTotalRecurringExpenses = (recurringExpenses:any) => {
    let newTotalRecurringExpenses = 0
    if (recurringExpenses.length > 0) {
        newTotalRecurringExpenses = recurringExpenses.reduce((prev:any, next:any) => {
            let nextValue = getNextValue(next)
            return prev + nextValue
        }, 0)
    }
    
    return parseFloat(newTotalRecurringExpenses.toFixed(2))
}