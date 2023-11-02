import BASE_URL from "@/app/constants/baseUrl/baseUrl";
import axios from "axios";

const postApiService = async (formData, endPoint) => {
    try {
        const response = await axios.post(`${BASE_URL}${endPoint}`, formData)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error); 
        alert(error.response.data.errors[0].msg)
        return error.response.data.errors[0].msg
    }
}

export default postApiService