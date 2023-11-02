import BASE_URL from "@/app/constants/baseUrl/baseUrl";
import axios from "axios";

const postApiService = async (formData, endPoint) => {
    try {
        const response = await axios.post(`${BASE_URL}${endPoint}`, formData)
        return response.data
    } catch (error) {
        console.log(error);
        if (endPoint === "/register"){
            alert(error.response.data.errors[0].msg)
            return error.response.data.errors[0].msg
        }else if (endPoint === "/login"){
            alert(error.response.data.error)
            return error.response.data.error
        }
    }
}

export default postApiService