import BASE_URL from "@/app/constants/baseUrl/baseUrl";
import axios from "axios";

const postApiService = async (formData, endPoint) => {
    try {
        const response = await axios.post(`${BASE_URL}${endPoint}`, formData)
        console.log(response.data)
        return response.data
    } catch (error) {
        return (error)
    }
}

export default postApiService