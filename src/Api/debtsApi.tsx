import axios from "axios";

const getDebts = async () => await axios.get(`/api/v1/Debts`)

export default {
    getDebts
}