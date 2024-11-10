import ax from "axios";

const sendSMS = async (phoneNumber : string) => {
    try {
        await ax.post('http://localhost:3000/api/sms/send-sms', { phoneNumber });
    } catch (error) {
        console.error('SMS sending error:', error);
    }
}

const sendEmail = async (email : string) => {
    try {
        await ax.post('http://localhost:3000/api/sms/send-email', {email});
    } catch (error) {
        console.error('Email sending error:', error);
    }
}

export {sendSMS, sendEmail};