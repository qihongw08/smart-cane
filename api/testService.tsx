const DEVICE_ID = '4b8e7ee4-6376-4d3d-a968-53535b98b599';
var THING_ID = '999f02f6-2b7d-4bf6-8a0d-a1ed5e44793e';
const ARDUINO_CLIENT_ID = 'CLIENT_ID';
const ARDUINO_CLIENT_SECRET = 'CLIENT_SECRET';
var IotApi = require('@arduino/arduino-iot-client');
var client = IotApi.ApiClient.instance;
const axios = require('axios');

async function getToken() {
    try {
        const response = await axios.post('https://api2.arduino.cc/iot/v1/clients/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: ARDUINO_CLIENT_ID,
                client_secret: ARDUINO_CLIENT_SECRET,
                audience: 'https://api2.arduino.cc/iot'
            }).toString(),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            } 
        );
        return response.data.access_token;
    }
    catch (error) {
        console.error("Failed getting an access token: " + error)
    }
}

async function listProperties() {
    // Configure OAuth2 access token for authorization: oauth2
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new IotApi.PropertiesV2Api(client);

    var opts = {
      'showDeleted': true // {Boolean} If true, shows the soft deleted properties
    };

    try {
        const data = await api.propertiesV2List(THING_ID, opts);
        console.log(data);
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error; // rethrow error for handling by the caller if needed
    }
}

async function updateProperty(property_id : string) {
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();
    var api = new IotApi.PropertiesV2Api(client);

    const property = {
        value: {
            lat: 100, // New latitude value
            lon: 200 // New longitude value
        }   
    };

    try {
        const response = await api.propertiesV2Publish(THING_ID, property_id, property);
        console.log("success: ", response);
    } catch (error) {
        console.error("error updating: ", error);
    }

}

//test
//updateProperty('27a614fa-2fe8-413f-923c-fa44d15c710c');