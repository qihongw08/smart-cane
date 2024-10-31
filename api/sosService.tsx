import ax from "axios";

const sendSMS = async (phoneNumber : string) => {
    try {
        await ax.post('http://localhost:3000/api/sms/send-sms', { phoneNumber });
    } catch (error) {
        console.error('SMS sending error:', error);
    }
}

export default sendSMS;