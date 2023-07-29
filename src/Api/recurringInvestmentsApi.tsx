import axios from "axios";

const getRecurringInvestments = async () => await axios.get(`/api/v1/RecurringInvestments`)

export default {
    getRecurringInvestments
}