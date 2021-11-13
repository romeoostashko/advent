import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	ScrollView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTaskFromEditorRedux, ReduxType } from "../../redux/reducer";
import { createNewDay, getDays } from "../../api/api";
import { StyledText, Button, Menu } from "../../components";
import { ProgressZero, TaskBilder } from "./components";

const image = require("../../assets/images/HomeBG.png");

export const Editor = ({ navigation }) => {
	const taskFromEditor = useSelector(
		(state: ReduxType) => state?.taskFromEditor
	);
	const id = useSelector((state: ReduxType) => state?.user?.id);
	const name = useSelector((state: ReduxType) => state?.user?.name);
	const community = useSelector(
		(state: ReduxType) => state?.myCommunityObj?.name
	);
	console.log("EDITOR=>", taskFromEditor);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [daysCompleted, setDaysCompleted] = useState<{}[]>([]);
	//-
	const [isSettings, setSettings] = useState<boolean>(false);
	const settingsHandler = () => setSettings((prev) => !prev);
	//-
	const [steps, setSteps] = useState<number>(1);
	const [day, setDay] = useState<number>(1);
	const [progress, setProgress] = useState(0);
	//-
	const [type, setType] = useState<string>("");
	const [videoURL, setVideoURL] = useState<string>("");
	const [photoURL, setPhotoURL] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [feedBack, setFeedBack] = useState<boolean>(true);
	const [makePhoto, setMakePhoto] = useState<boolean>(true);

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
			console.log("Очищення Клави в Editor");
		};
	}, []);
	//***************************************************

	useEffect(() => {
		getDaysFromServer();
	}, [day, progress]);

	const getDaysFromServer = async () => {
		const res = await getDays(community);
		setDaysCompleted(
			Object?.values(res?.data || {}).map((item: any) => `День ${item.day}`)
		);
	};

	const skipStateTask = () => {
		setPhotoURL("");
		setType(""), setVideoURL(""), setDescription(""), setFeedBack(true);
	};

	const videoURLHandler = (url: string) => {
		setErrorMessage("");
		const newUrl = url.split("/");
		setVideoURL(newUrl[newUrl.length - 1]);
	};

	const photoURLHandler = (url: string) => {
		setErrorMessage("");
		setPhotoURL(url);
	};

	const descriptionHandler = (text: string) => {
		setErrorMessage("");
		setDescription(text);
	};

	const typeHandler = (text: string) => {
		setErrorMessage("");
		setType(text);
	};

	const submit = async () => {
		if (!community) {
			navigation.navigate("SelectCommunity");
		}
		if (progress === 0) {
			setTaskFromEditorRedux({ day, steps })(dispatch);
			setProgress(1);
		} else if (steps >= progress && progress > 0) {
			//region validation ***********
			setErrorMessage("");
			if (!type) {
				setErrorMessage("Виберіть тип завдання");
				return;
			}

			if (
				!!photoURL &&
				!(
					photoURL.includes(".jpeg") ||
					photoURL.includes(".png") ||
					photoURL.includes(".jpg")
				)
			) {
				setErrorMessage("Додайте URL, що закінчується на .jpeg, .jpg, .png");
				return;
			}

			if (!description) {
				setErrorMessage("Додайте текст");
				return;
			}

			if (description && description.trim()?.length < 10) {
				setErrorMessage("Додайте більше тексту");
				return;
			}

			if (!videoURL && type === "video") {
				setErrorMessage("Додайте URL");
				return;
			}

			//endregion ******************
			setTaskFromEditorRedux({
				task:
					type === "video"
						? [
								{
									type,
									videoURL,
									description,
									feedBack,
									status: false,
								},
						  ]
						: type === "text"
						? [
								{
									type,
									description,
									photoURL,
									feedBack,
									status: false,
								},
						  ]
						: [
								//photo
								{
									type,
									description,
									photoURL,
									feedBack,
									status: false,
									makePhoto,
								},
						  ],
			})(dispatch);
			setProgress((prev) => prev + 1);
			skipStateTask();
		} else {
			console.log("community", community);
			await createNewDay(taskFromEditor, community, day);
			console.log("END and SEND to server");
			setProgress(0);
			setDay(1);
			setSteps(1);
			setTaskFromEditorRedux({
				clean: true,
			})(dispatch);
		}
	};

	return (
		<TouchableWithoutFeedback
			style={{ height: "100%", width: "100%", backgroundColor: "#ccc" }}
			onPress={() => Keyboard.dismiss()}
		>
			<ImageBackground
				style={styles.imageBackground}
				source={image}
				resizeMode="cover"
			>
				<View style={styles.content}>
					<View style={styles.settingsIcon}>
						<TouchableOpacity onPress={settingsHandler}>
							<Entypo name="dots-three-horizontal" size={32} color="white" />
						</TouchableOpacity>
					</View>
					{!isSettings ? (
						<ScrollView
							contentContainerStyle={{
								flexGrow: 1,
								justifyContent: "center",
							}}
							style={{ width: "95%" }}
						>
							{!keyboardStatus && (
								<>
									<StyledText color="white" size={34}>
										Редактор
									</StyledText>
									{!!progress && progress <= steps && (
										<StyledText size={26} color="white">
											Завдання {progress}
										</StyledText>
									)}
								</>
							)}

							<View style={{ flex: 1, justifyContent: "center" }}>
								{progress === 0 ? (
									<ProgressZero
										daysCompleted={daysCompleted}
										setDay={setDay}
										day={day}
										setSteps={setSteps}
										steps={steps}
									/>
								) : steps >= progress && progress > 0 ? (
									<TaskBilder
										setType={typeHandler}
										type={type}
										progress={progress}
										setVideoURL={videoURLHandler}
										videoURL={videoURL}
										setPhotoURL={photoURLHandler}
										photoURL={photoURL}
										setDescription={descriptionHandler}
										description={description}
										keyboardStatus={keyboardStatus}
										feedBack={feedBack}
										setFeedBack={setFeedBack}
										setMakePhoto={setMakePhoto}
										makePhoto={makePhoto}
										errorMessage={errorMessage}
									/>
								) : (
									<View style={{ alignItems: "center" }}>
										<TouchableOpacity
											onPress={submit}
											style={{
												width: "90%",
												minHeight: 42,
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "rgba(255,255,255,0.8)",
												borderRadius: 8,
												marginTop: 16,
												padding: 4,
											}}
										>
											<StyledText size={26}>
												Зберегти та додати ще день
											</StyledText>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => navigation.goBack()}
											style={{
												width: "90%",
												minHeight: 42,
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "rgba(255,255,255,0.8)",
												borderRadius: 8,
												marginTop: 24,
												padding: 4,
											}}
										>
											<StyledText size={26}>
												Зберегти та вийти з редактора
											</StyledText>
										</TouchableOpacity>
									</View>
								)}
							</View>
						</ScrollView>
					) : (
						<Menu navigation={navigation} isEditor />
					)}
				</View>

				{!keyboardStatus && (
					<Button
						disabled={false}
						marginTop={24}
						width="80%"
						title={steps < progress && progress > 0 ? "Зберегти" : "Продовжити"}
						onPress={submit}
					/>
				)}
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		height: "75%",
		width: "85%",
		backgroundColor: "rgba(0,0,0,0.8)",
		borderRadius: 12,
		alignItems: "center",
		padding: 10,
	},
	picker: {
		marginTop: 8,
		width: "100%",
		backgroundColor: "rgba(255,255,255,0.7)",
		borderRadius: 16,
	},
	settingsIcon: {
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		left: "42%",
	},
});
