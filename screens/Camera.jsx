import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	LogBox,
	ActivityIndicator,
} from "react-native";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { StyledText, Button } from "../components";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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

export const MyCamera = ({ setIsCameraLaunch, setUrlPhotoFromUser }) => {
	const CameraRef = useRef(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [isRatioSet, setIsRatioSet] = useState(false);
	const [uri, setUri] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const makePhoto = async () => {
		if (CameraRef.current) {
			let photo = await CameraRef.current.takePictureAsync({ quality: 0.2 });
			setUri(photo.uri);
			//CameraRef.current.pausePreview();
		}
	};

	const reverse = async () => {
		setType(
			type === Camera.Constants.Type.back
				? Camera.Constants.Type.front
				: Camera.Constants.Type.back
		);
	};

	const submit = async () => {
		setLoaded(true);
		const uploadUrl = await uploadImageAsync(uri);
		setUrlPhotoFromUser(uploadUrl);
		setLoaded(false);
		setIsCameraLaunch((prev) => !prev);
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
						{/* reverse */}
						<TouchableOpacity style={styles.button} onPress={reverse}>
							<Ionicons name="camera-reverse-outline" size={24} color="white" />
						</TouchableOpacity>

						{/* Close */}
						<TouchableOpacity
							style={styles.button}
							onPress={() => setIsCameraLaunch((prev) => !prev)}
						>
							<AntDesign name="close" size={24} color="white" />
						</TouchableOpacity>
					</View>

					{/* Make Photo */}
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Button
							isIconPhoto
							onPress={makePhoto}
							marginBottom={16}
							width={48}
							height={48}
						/>
					</View>
				</Camera>
			)}
			{!!uri && (
				<ImageBackground
					style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
					source={{
						uri: uri,
					}}
				>
					{loaded && (
						<>
							<ActivityIndicator
								size="large"
								color="white"
								style={{ marginBottom: 50 }}
							/>
							<StyledText color="white">Зберігаю...</StyledText>
						</>
					)}
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
						}}
					>
						<Button
							isIconPhoto
							onPress={() => setUri("")}
							marginBottom={16}
							width={48}
							height={48}
						/>
						<Button
							isIconSave
							onPress={submit}
							marginBottom={16}
							marginLeft={24}
							width={48}
							height={48}
						/>
					</View>
				</ImageBackground>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		flex: 1,
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
	},
	buttonContainer: {
		backgroundColor: "transparent",
		flexDirection: "row",
		margin: 20,
		justifyContent: "space-between",
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
