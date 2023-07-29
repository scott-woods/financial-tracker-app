import axios from "axios";

const getRecurringExpenses = async () => await axios.get(`/api/v1/RecurringExpenses`)

export default {
    getRecurringExpenses
}