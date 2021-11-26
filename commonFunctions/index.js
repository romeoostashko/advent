import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";

export const pickImage = async () => {
	const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (status !== "granted") {
		alert("Sorry, we need camera roll permissions to make this work!");
		return;
	}

	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [4, 3],
		quality: 0.5,
	});

	//console.log("selected photo: ", result);

	if (!result.cancelled) {
		return uploadImageAsync(result?.uri);
	}
};

async function uploadImageAsync(uri) {
	// Why are we using XMLHttpRequest? See:
	// https://github.com/expo/expo/issues/2402#issuecomment-443726662
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			console.log(e);
			reject(new TypeError("Network request failed"));
		};
		xhr.responseType = "blob";
		xhr.open("GET", uri, true);
		xhr.send(null);
	});
	const fileRef = ref(getStorage(), uuid.v4());
	const result = await uploadBytes(fileRef, blob);

	// We're done with the blob, close and release it
	blob.close();
	const res = await getDownloadURL(fileRef);
	//console.log("res download img ", res);
	return res;
}
