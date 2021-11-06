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

//*********************************** */
//----- Users
export const signUp = ({
	name,
	password,
	community,
}: {
	name: string;
	password: string;
	community: string;
}) =>
	axiosInstance.post(`/urers/${community}/${name}.json`, { name, password });

//----
export const getAllUsersByCommunity = (community: string) =>
	axiosInstance.get(`/urers/${community}.json`);

//************************************** */
//----- Community
export const createNewCommunity = (name: string, password: string) =>
	axiosInstance.put(`/communities/${name}.json`, { name, password });

export const getAllCommunity = () => axiosInstance.get(`/communities.json`);
