import BASE_URL from "@/app/constants/baseUrl/baseUrl";
import axios from "axios";

const postApiServiceWithFileAndHeaders = async (formData, endPoint, headers) => {
    try {
        const response = await axios.post(`${BASE_URL}${endPoint}`, formData, {
            headers: {...headers}
        })
        return response.data
    } catch (error) {
        console.log(error)
        alert (error.response.data.errors[0].msg)
        return (error.response.data.errors[0].msg)
    }
}

export default postApiServiceWithFileAndHeaders