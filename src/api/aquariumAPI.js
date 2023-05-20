import { getRequest, postRequest } from "../utils/request";

export const getAquariumsByUserId = async (userId) => {

    const responseData = await getRequest(`/aquariums/${userId}`);
    
    return responseData;
}  

export const getSensorDataByAquariumId = async (aquariumId) => {

    const responseData = await getRequest(`/aquarium/${aquariumId}/sensor-data`);

    return responseData;
}

export const createAquarium = async (name, ownerId, deviceId) => {

    const body = {
        name: name,
        owner: ownerId,
        smartDevice: deviceId
    }
    const responseData = await postRequest(`/aquarium`, body);

    return responseData;
}

export const startMonitoring = async (aquariumId) =>{

    const responseData = await postRequest(`aquarium/${aquariumId}/start-device`);

    return responseData;
}

export const getAquariumById = async (aquariumId) =>{

    const responseData = await getRequest(`aquarium/${aquariumId}`);

    return responseData;
}