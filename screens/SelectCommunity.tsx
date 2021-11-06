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
import { Picker } from "@react-native-picker/picker";
import { signUp, getAllCommunity } from "../api/api";
import {
	storeMyLoginData,
	getMyLoginData,
	storeMyCommunity,
	getMyCommunity,
} from "../api/asyncStorage";
import { setMycommunityRedux } from "../redux/reducer";
import { useDispatch } from "react-redux";
import { Button, Input, StyledText, Link } from "../components";

export const SelectCommunity = ({ navigation }: { navigation: Navigation }) => {
	const dispatch = useDispatch();
	const [selected, setSelected] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [dataRender, setDataRender] = useState<
		{ name: string; password: string }[]
	>([]);

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
			console.log("Очищення Клави в SelectCommunity");
		};
	}, []);
	//***************************************************

	const getCommunitiesFromServer = async () => {
		const allCommunities = await getAllCommunity();
		setDataRender(Object?.values(allCommunities?.data || {}));
	};

	useEffect(() => {
		getCommunitiesFromServer();
	}, []);

	const submit = async () => {
		setErrorMessage("");

		//region VALIDATION *******************************
		//***************************************************
		if (password?.length < 3) {
			setErrorMessage("Пароль повинен містити мінімум 3 символи");
			return;
		}

		const obj = { name: selected, password };

		if (
			!dataRender?.find(
				(item: { name: string; password: string }) =>
					item.name === obj.name && item.password === obj.password
			)
		) {
			setErrorMessage("Пароль невірний");
			return;
		}
		//endregion

		//***************************************************
		//region SAVE DATA *******************************

		setMycommunityRedux(obj)(dispatch);
		await storeMyCommunity(obj);
		navigation.navigate("Login");
	};

	const image = require("../assets/images/LoginBG.png");
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
							Вибрати тусовку
						</StyledText>

						<StyledText
							marginTop={8}
							width="100%"
							color="rgba(255,255,255,0.7)"
							size={16}
						>
							Виберіть вашу тусовку із списку
						</StyledText>

						<Picker
							style={styles.picker}
							selectedValue={selected}
							onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
						>
							{dataRender?.map((item) => (
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

						<Button marginTop={16} title="Вибрати" onPress={submit} />
					</View>
					{!keyboardStatus && (
						<Link
							onPress={() => navigation.navigate("AddNewClub")}
							color="white"
						>
							Зареєструвати тусу
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
