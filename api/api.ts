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
export const signUp = async ({
	name,
	password,
	community,
}: {
	name: string;
	password: string;
	community: string;
}) =>
	await axiosInstance.post(`/users/${community}/${name}.json`, {
		name,
		password,
	});

//----
export const getAllUsersByCommunity = async (community: string) =>
	await axiosInstance.get(`/users/${community}.json`);

//************************************** */
//region[rgba(666,177,89,0.1)] Community
export const createNewCommunity = async (name: string, password: string) =>
	await axiosInstance.put(`/communities/${name}.json`, { name, password });
//-----------------------
export const getAllCommunity = async () =>
	await axiosInstance.get(`/communities.json`);

//endregion************************************** */

//region [rgba(0,205,30,0.1)] Editor
export const createNewDay = async (
	obj: object,
	community: string,
	day: number
) =>
	await axiosInstance.patch(
		`/communities/${community}/tasks/day${day}.json`,
		obj
	);
//-----------------------
export const getDays = async (community: string) =>
	await axiosInstance.get(`/communities/${community}/tasks.json`);
//endregion

//region [rgba(0,205,366,0.1)] Progress

export const setProgress = async (
	obj: object,
	day: number,
	step: number,
	community: string,
	name: string
) => {
	await axiosInstance.patch(
		`/users/${community}/${name}/progress/day${day}/${step}.json`,
		obj
	);
};

export const setEnd = async (day: number, community: string, name: string) => {
	await axiosInstance.patch(
		`/users/${community}/${name}/progress/day${day}.json`,
		{ status: true }
	);
};

export const clearProgress = async (
	day: number,
	step: number,
	community: string,
	name: string
) => {
	await axiosInstance.delete(
		`/users/${community}/${name}/progress/day${day}.json`
	);
};

export const getProgressDay = async (
	day: number,
	community: string,
	name: string
) => {
	return await axiosInstance.get(
		`/users/${community}/${name}/progress/day${day}.json`
	);
};

//endregion
