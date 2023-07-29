import axios from "axios";

const getRecurringIncomes = async () => await axios.get(`/api/v1/RecurringIncomes`)
const getRecurringIncomeTotal = async () => await axios.get(`/api/v1/RecurringIncomes/total`)

export default {
    getRecurringIncomes,
    getRecurringIncomeTotal
}