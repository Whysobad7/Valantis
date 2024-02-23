import axios from "axios";
import md5 from 'crypto-js/md5'


const API_URL = '//api.valantis.store:40000/'
const PASSWORD = 'Valantis';

const generateAuthHeader = () => {
	const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
	const authString = md5(`${PASSWORD}_${timestamp}`).toString();
	return { 'X-Auth': authString };
}

export const apiRequest = async (action: string, params: Record<string, any> = {}) => {
	try {
		const response = await axios.post(
			API_URL,
			 { action, params },
			  { headers: { ...generateAuthHeader() }}
			);
		return response.data.result;
	} catch (error) {
		console.error('Error:', error);
	}
}