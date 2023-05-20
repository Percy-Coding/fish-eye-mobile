import { postRequest } from "../utils/request";

export const loginUser = async (username, password) => {
    const body = {
        username,
        password
    }
    const responseData = await postRequest('/users/login', body);
    
    return responseData;
}   