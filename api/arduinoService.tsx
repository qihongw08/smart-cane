const BASE_URI = 'https://zrcctnww-3000.use.devtunnels.ms';
import axios from "axios";

async function getToken() {
    try {
        const token = await axios.get(`${BASE_URI}/api/arduino/token`);
        return token.data.token;
    } catch (error) {
        console.error("Failed to get token", error);
    }
}

async function listProperties() {
}

async function getPropertyValue(property_id : string) {
    try {
        const value = await axios.get(`${BASE_URI}/api/arduino/property/${property_id}`);
        return value.data.value;
    } catch (error) {
        console.log("Failed to get property", error);
    }
}

async function updateProperty(property_id : string, property: any) {
    try {
        const body = {
            propertyId : property_id, 
            newValue : property
        }
        await axios.put(`${BASE_URI}/api/arduino/property`, body);
    } catch (error) {
        console.log("Failed to update property", error);
    }
}

getPropertyValue('648d74df-ca66-4c2c-bfa2-003ab4a024b2');

export { listProperties, getPropertyValue, updateProperty };
