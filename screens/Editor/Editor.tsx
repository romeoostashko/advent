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
import { StyledText, Button, Menu } from "../../components";
import { ProgressZero, TaskBilder } from "./components";

const image = require("../../assets/images/HomeBG.png");

export const Editor = ({ navigation }) => {
	const task = useSelector((state: ReduxType) => state?.taskFromEditor);
	console.log("EDITOR=>", task);
	const dispatch = useDispatch();
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
	const [description, setDescription] = useState<string>("");
	const [feedBack, setFeedBack] = useState<boolean>(true);

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

	const skipStateTask = () => {
		setType(""), setVideoURL(""), setDescription(""), setFeedBack(true);
	};

	const videoURLHandler = (url: string) => {
		const newUrl = url.split("/");
		setVideoURL(newUrl[newUrl.length - 1]);
	};

	const submit = async () => {
		if (progress === 0) {
			console.log("data for send EDITOR", { day, steps });
			setTaskFromEditorRedux({ day, steps })(dispatch);
			setProgress(1);
		} else if (steps >= progress && progress > 0) {
			if (!type || (!videoURL && type === "video")) {
				return;
			}
			setTaskFromEditorRedux({
				task: [{ type, videoURL, description, feedBack, status: false }],
			})(dispatch);
			setProgress((prev) => prev + 1);
			skipStateTask();
			console.log("data for send EDITOR", {
				type,
				videoURL,
				description,
				feedBack,
			});
		} else {
			console.log("END");
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
										setDay={setDay}
										day={day}
										setSteps={setSteps}
										steps={steps}
									/>
								) : steps >= progress && progress > 0 ? (
									<TaskBilder
										setType={setType}
										type={type}
										progress={progress}
										setVideoURL={videoURLHandler}
										videoURL={videoURL}
										setDescription={setDescription}
										description={description}
										keyboardStatus={keyboardStatus}
										feedBack={feedBack}
										setFeedBack={setFeedBack}
									/>
								) : (
									<View style={{ alignItems: "center" }}>
										<TouchableOpacity
											onPress={submit}
											style={{
												width: "90%",
												height: 42,
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "rgba(255,255,255,0.8)",
												borderRadius: 8,
												marginTop: 16,
											}}
										>
											<StyledText size={26}>Додати ще день</StyledText>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => navigation.goBack()}
											style={{
												width: "90%",
												height: 42,
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "rgba(255,255,255,0.8)",
												borderRadius: 8,
												marginTop: 24,
											}}
										>
											<StyledText size={26}>Вийти з редактора</StyledText>
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
						title="Продовжити"
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
