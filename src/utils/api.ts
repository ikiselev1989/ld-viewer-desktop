import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export default {
	get(url: string, request = null) {
		return axios.get(url, request)
			.then((response) => {
				if (response.status === 200)
					return response.data;
			})
			.catch((error) => Promise.reject(error));
	},
	post(url: string, request = null) {
		return axios.post(url, request)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},
	request(options: AxiosRequestConfig) {
		return axios(options)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},
};
