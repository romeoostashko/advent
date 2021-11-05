import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	LogBox,
} from "react-native";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { Camera } from "expo-camera";

const firebaseConfig = {
	apiKey: "AIzaSyDn9QspiwR1l_UGUpkpmROtKF4lN1NVXho",
	authDomain: "advent-3ff00-default-rtdb.europe-west1.firebasedatabase.app/",
	databaseURL:
		"https://advent-3ff00-default-rtdb.europe-west1.firebasedatabase.app/",
	storageBucket: "blobtest-36ff6.appspot.com",
	messagingSenderId: "825887074257",
};

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that

initializeApp(firebaseConfig);

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export const MyCamera = () => {
	const CameraRef = useRef(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [isRatioSet, setIsRatioSet] = useState(false);
	const [uri, setUri] = useState(null);

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

		return await getDownloadURL(fileRef);
	}

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const setCameraReady = async () => {
		if (!isRatioSet) {
			//await prepareRatio();
		}
	};
	return (
		<View style={styles.container}>
			{!uri && (
				<Camera
					ref={CameraRef}
					onCameraReady={setCameraReady}
					style={styles.camera}
					type={type}
				>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={async () => {
								/*setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);*/

								if (CameraRef.current) {
									let photo = await CameraRef.current.takePictureAsync();
									setUri(photo.uri);

									const uploadUrl = await uploadImageAsync(photo.uri);
									console.log(uploadUrl);
									setUri(uploadUrl);

									//CameraRef.current.pausePreview();
								}
							}}
						>
							<Text style={styles.text}> Flip </Text>
						</TouchableOpacity>
					</View>
				</Camera>
			)}
			{uri && (
				<Image
					style={{ width: "100%", height: "80%" }}
					source={{
						uri: uri,
					}}
				></Image>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		width: "100%",
		height: "100%",
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: "transparent",
		flexDirection: "row",
		margin: 20,
	},
	button: {
		flex: 0.1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		color: "white",
	},
});
