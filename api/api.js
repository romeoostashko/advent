import axios from "axios";

const Instans = () => {
	const baseURL =
		"https://advent-3ff00-default-rtdb.europe-west1.firebasedatabase.app/";

	return axios.create({
		baseURL: baseURL,
	});
};

const axiosInstance = Instans();

export default axiosInstance;

export const signUp = (name) =>
	axiosInstance.post(`/urers/${name}.json`, { name });

export const getAllUsers = () => axiosInstance.get(`/urers.json`);
