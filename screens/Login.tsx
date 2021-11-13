import React, { useState, useEffect, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { getAllUsersByCommunity } from "../api/api";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { storeUserLS } from "../api/asyncStorage";
import { ReduxType, setUserRedux } from "../redux/reducer";
import { Button, Input, StyledText, Link } from "../components";
const image = require("../assets/images/LoginBG.png");

export const Login = ({ navigation }: { navigation: any }) => {
	const dispatch = useDispatch();
	const communityObj = useSelector((state: ReduxType) => state.myCommunityObj);
	const [users, setUsers] = useState<
		{ name: string; password: string; id: string }[]
	>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	useFocusEffect(
		useCallback(() => {
			getAllUsers();
		}, [])
	);

	const getAllUsers = async () => {
		const allUsersFromServer = await getAllUsersByCommunity(communityObj?.name);
		const arrayUsersData = Object?.values(allUsersFromServer?.data || {})?.map(
			(item: any) => ({
				...Object?.entries(item)[0][1],
				id: Object?.entries(item)[0][0],
			})
		);

		setUsers(arrayUsersData);
	};

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
			console.log("Очищення Клави в Login");
		};
	}, []);
	//***************************************************

	const validation = async () => {
		setErrorMessage("");
		if (!userName) {
			setErrorMessage("Виберіть ім'я");
			return true;
		}
		if (password?.length < 3) {
			setErrorMessage("Пароль повинен містити мінімум 3 символи");
			return true;
		}

		return false;
	};

	const submit = async () => {
		const isValid = await validation();
		if (isValid) {
			return;
		}

		const objectForSearch = {
			name: userName,
			password: password,
		};
		const obj = users?.find(
			(item: { name: string; password: string }) =>
				item.name === objectForSearch.name &&
				item.password === objectForSearch.password
		);

		if (!obj) {
			setErrorMessage("Пароль невірний");
			return;
		}
		setPassword("");
		setUserRedux(obj)(dispatch);
		await storeUserLS(obj);
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
							{communityObj?.name + " Advent"}
						</StyledText>
					)}

					<View style={styles.form}>
						<StyledText color="white" size={32}>
							Залогінитись
						</StyledText>
						<StyledText
							marginTop={8}
							width="100%"
							color="rgba(255,255,255,0.7)"
							size={16}
						>
							Виберіть ім'я, яке ви раніше зареєстрували в програмі
						</StyledText>
						<Picker
							style={styles.picker}
							selectedValue={userName}
							onValueChange={(itemValue, itemIndex) => setUserName(itemValue)}
						>
							<Picker.Item key={""} label="Виберіть ім'я" value="" />
							{users?.map((item) => (
								<Picker.Item
									key={item?.name}
									label={item?.name}
									value={item?.name}
								/>
							))}
						</Picker>
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
						<Button marginTop={16} title="Вхід" onPress={() => submit()} />
					</View>
					{!keyboardStatus && (
						<Link
							onPress={() => navigation.navigate("Registration")}
							color="white"
						>
							Зареєструватися
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
	picker: {
		marginTop: 8,
		width: "100%",
		backgroundColor: "rgba(255,255,255,0.7)",
		borderRadius: 16,
	},
});
