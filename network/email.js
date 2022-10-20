import axios from 'axios';

const EMAIL = 'http://localhost:5000/api';

export const sendEmail = async (payload) => {
    let response = await axios.post(`${EMAIL}/email`, payload)
    // console.log(response.data);
    return response.data;

}