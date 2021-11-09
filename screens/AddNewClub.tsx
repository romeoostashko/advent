import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { createNewCommunity, getAllCommunity } from "../api/api";
import { Button, Input, StyledText, Link } from "../components";
const image = require("../assets/images/RegistrationBg.png");

export const AddNewClub = ({ navigation }: { navigation: Navigation }) => {
	const [communityName, setCommunityName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	//***************************************************
	const [keyboardStatus, setKeyboardStatus] = useState(false);
	useEffect(() => {
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardStatus(true);
		});
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardStatus(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
			console.log("Очищення Клави в AddNewClub");
		};
	}, []);
	//***************************************************

	const communityIsAlreadyExists = async () => {
		const allCommunities = await getAllCommunity();
		if (Object?.keys(allCommunities?.data || {})?.includes(communityName)) {
			return true;
		}
	};

	const validation = async () => {
		setErrorMessage("");

		//region VALIDATION *******************************
		//***************************************************
		if (communityName?.length < 3) {
			setErrorMessage("Назваповинна містити мінімум 3 символи");
			return true;
		}

		if (password?.length < 3) {
			setErrorMessage("Пароль повинен містити мінімум 3 символи");
			return true;
		}

		if (await communityIsAlreadyExists()) {
			setErrorMessage("Ця назва вже зайнята. Спробуйте іншу");
			return true;
		}
		//endregion
		//***************************************************
	};

	const submit = async () => {
		if (await validation()) {
			return;
		}
		await createNewCommunity(communityName, password);
		setCommunityName("");
		setPassword("");
		navigation.replace("Login");
	};

	return (
		<ImageBackground
			style={styles.imageBackground}
			source={image}
			resizeMode="cover"
		>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
				style={{ height: "100%", width: "100%" }}
			>
				<KeyboardAvoidingView
					keyboardShouldPersistTaps={"handled"}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={[
						styles.container,
						{ justifyContent: keyboardStatus ? "center" : "space-between" },
					]}
				>
					{!keyboardStatus && (
						<StyledText color="white" size={32}>
							Diamant Advent
						</StyledText>
					)}

					<View style={styles.form}>
						<StyledText color="white" size={32}>
							Реєстрація тусовки
						</StyledText>
						<StyledText
							marginTop={8}
							width="100%"
							color="rgba(255,255,255,0.7)"
							size={16}
						>
							Назва вашого клубу, групи, тусовки
						</StyledText>
						<Input
							value={communityName}
							onChangeText={(text) => {
								setCommunityName(text);
								setErrorMessage("");
							}}
							placeholder="Назва клубу"
							marginTop={16}
						/>
						<Input
							value={password}
							onChangeText={(text) => {
								setPassword(text);
								setErrorMessage("");
							}}
							placeholder="Пароль"
							marginTop={16}
						/>
						<StyledText align="left" size={14} color="#f56e27">
							{errorMessage}
						</StyledText>

						<Button
							marginTop={16}
							title="Додати клуб"
							onPress={() => submit()}
						/>
					</View>

					{!keyboardStatus && (
						<Link
							onPress={() => navigation.navigate("SelectCommunity")}
							color="white"
						>
							Виберіть вашу тусовку
						</Link>
					)}
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		height: "85%",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
	},
	form: {
		width: "85%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.7)",
		padding: 16,
		borderRadius: 8,
	},
});
