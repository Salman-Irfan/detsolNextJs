import BASE_URL from "@/app/constants/baseUrl/baseUrl";
import axios from "axios";

const postApiServiceWithFileAndHeaders = async (formData, endPoint, headers) => {
    try {
        const response = await axios.post(`${BASE_URL}${endPoint}`, formData, {
            headers: {...headers}
        })
        console.log(formData)
        // console.log(response.data)
        return response.data
    } catch (error) {
        return (error)
    }
}

export default postApiServiceWithFileAndHeaders