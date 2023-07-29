import axios from "axios";

const getExpenses = async (startDate : any, endDate : any) => await axios.get(`/api/v1/Expenses`, {
    params: {
        startDate: startDate,
        endDate: endDate
    }
})

export default {
    getExpenses
}