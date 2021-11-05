import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeMyLoginData = async (obj: { name: string; id: string }) => {
	try {
		const jsonObj = JSON.stringify(obj);
		await AsyncStorage.setItem("storage_my_login_data", jsonObj);
	} catch (e) {
		// saving error
	}
};

export const getMyLoginData = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem("storage_my_login_data");
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const storeData = async (value) => {
	try {
		await AsyncStorage.setItem("@storage_Key", value);
	} catch (e) {
		// saving error
	}
};

const getData = async () => {
	try {
		const value = await AsyncStorage.getItem("@storage_Key");
		if (value !== null) {
			// value previously stored
		}
	} catch (e) {
		// error reading value
	}
};
// ----- Obj
const storeDataObj = async (value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem("@storage_Key", jsonValue);
	} catch (e) {
		// saving error
	}
};

const getDataObj = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem("@storage_Key");
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};
