import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { signUp, getAllUsersByCommunity } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { storeUserLS, getUserLS } from "../api/asyncStorage";
import { ReduxType, setUserRedux } from "../redux/reducer";
import { Button, Input, StyledText, Link } from "../components";

const image = require("../assets/images/RegistrationBg.png");

export const Registration = ({ navigation }: { navigation: any }) => {
	const dispatch = useDispatch();
	const communityObj = useSelector((state: ReduxType) => state.myCommunityObj);
	const [userName, setUserName] = useState<string>("");
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
			console.log("Очищення Клави в Registration");
		};
	}, []);
	//***************************************************

	const userIsAlreadyExists = async () => {
		const allUsers = await getAllUsersByCommunity(communityObj?.name);
		//console.log("=>", Object?.keys(allUsers?.data || {})?.includes(userName));
		if (Object?.keys(allUsers?.data || {})?.includes(userName)) {
			return true;
		}
		return false;
	};

	const validation = async () => {
		setErrorMessage("");

		if (userName?.length < 3) {
			setErrorMessage("Ім'я повинно містити мінімум 3 символи");
			return true;
		}

		if (password?.length < 3) {
			setErrorMessage("Пароль повинен містити мінімум 3 символи");
			return true;
		}
		const isAlreadyExists = await userIsAlreadyExists();
		if (isAlreadyExists) {
			setErrorMessage("Користувач з таким іменем вже існує");
			return true;
		}
		return false;
	};

	const submit = async () => {
		const isValid = await validation();
		if (isValid) {
			return;
		}
		const objectForSend = {
			name: userName,
			password: password,
			community: communityObj?.name,
		};
		console.log("objectForSend => ", objectForSend);
		const res = await signUp(objectForSend);

		if (!res?.data?.name) {
			setErrorMessage("Помилка сервера, спробуйте пізніше");
		}

		setUserName("");
		setPassword("");
		setUserRedux({ name: userName, password: password, id: res?.data?.name })(
			dispatch
		);
		await storeUserLS({
			name: userName,
			password: password,
			id: res?.data?.name,
		});
		navigation.replace("Root");
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
							Реєстрація
						</StyledText>
						<StyledText
							marginTop={8}
							width="100%"
							color="rgba(255,255,255,0.7)"
							size={16}
						>
							Запамятайте ім'я та пароль під яким плануєте зареєструватися!
						</StyledText>

						<Input
							value={userName}
							onChangeText={(text) => {
								setUserName(text);
								setErrorMessage("");
							}}
							placeholder="Ваше ім'я"
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
							title="Зараєструватись"
							onPress={() => submit()}
						/>
					</View>
					{!keyboardStatus && (
						<Link onPress={() => navigation.navigate("Login")} color="white">
							Вже зареєструвались? Увійдіть!
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
