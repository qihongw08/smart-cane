const BASE_URI = 'http://localhost:3000';
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
        console.log(property_id);
        const value = await axios.get(`${BASE_URI}/api/arduino/property/${property_id}`);
        return value;
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

export { listProperties, getPropertyValue, updateProperty };

//test
//listProperties();
//updateProperty('27a614fa-2fe8-413f-923c-fa44d15c710c');