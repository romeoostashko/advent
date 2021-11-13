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
	axiosInstance.post(`/users/${community}/${name}.json`, { name, password });

//----
export const getAllUsersByCommunity = (community: string) =>
	axiosInstance.get(`/users/${community}.json`);

//************************************** */
//region[rgba(666,177,89,0.1)]Community
export const createNewCommunity = (name: string, password: string) =>
	axiosInstance.put(`/communities/${name}.json`, { name, password });
//-----------------------
export const getAllCommunity = () => axiosInstance.get(`/communities.json`);

//endregion************************************** */

//region [rgba(0,205,30,0.1)]Editor
export const createNewDay = (obj: object, community: string, day: number) =>
	axiosInstance.patch(`/communities/${community}/tasks/day${day}.json`, obj);
//-----------------------
export const getDays = (community: string) =>
	axiosInstance.get(`/communities/${community}/tasks.json`);
//endregion
