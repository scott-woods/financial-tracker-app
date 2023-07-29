import axios from "axios";

const getUserMetadata = () => axios.get(`/api/v1/Users`)

export default {
    getUserMetadata
}