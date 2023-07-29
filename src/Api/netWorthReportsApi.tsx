import axios from "axios";

const getNetWorthReports = async () => await axios.get(`/api/v1/NetWorthReports`)

export default {
    getNetWorthReports
}