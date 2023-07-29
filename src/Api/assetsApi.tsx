import axios from "axios";

const getAssets = async () => await axios.get(`/api/v1/Assets`)

export default {
    getAssets
}