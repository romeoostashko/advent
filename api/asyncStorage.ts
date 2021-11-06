import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserLS = async (obj: {
	name?: string;
	password?: string;
	photo?: string;
	id?: string;
}) => {
	try {
		const jsonObj = JSON.stringify(obj);
		await AsyncStorage.setItem("userData", jsonObj);
	} catch (e) {
		// saving error
	}
};

export const getUserLS = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem("userData");
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};

////////////////////////////////////////////////////////////

export const storeMyCommunity = async (value: {
	name: string;
	password: string;
}) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem("MyCommunity", jsonValue);
	} catch (e) {
		// saving error
	}
};

export const getMyCommunity = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem("MyCommunity");
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
