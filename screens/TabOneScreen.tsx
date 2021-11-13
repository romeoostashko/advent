import React, { useEffect, useState, useRef } from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ReduxType } from "../redux/reducer";
import { getDays } from "../api/api";
import { Entypo } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";
import { StyledText, Button, Menu, Input } from "../components";
import { MyCamera } from "./Camera";

const image = require("../assets/images/HomeBG.png");

export const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
	const scrollRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState<{
		message: string;
		type: string;
	}>({
		message: "",
		type: "",
	});
	const [isSettings, setSettings] = useState<boolean>(false);
	const [days, setDays] = useState([]);
	const [today, setToday] = useState(1);
	const [todayData, setTodayData] = useState({ task: [{ description: "" }] });
	const [step, setStep] = useState(1);
	const [isCameraLaunch, setIsCameraLaunch] = useState(false);
	const [urlPhotoFromUser, setUrlPhotoFromUser] = useState("");
	const [feedBack, setFeedback] = useState("");

	const settingsHandler = () => setSettings((prev) => !prev);
	const community = useSelector(
		(state: ReduxType) => state?.myCommunityObj?.name
	);

	console.log("urlPhotoFromUser", urlPhotoFromUser);

	useEffect(() => {
		getDaysFromServer();
	}, []);

	useEffect(() => {
		setTodayData(
			!!days?.length
				? days?.find((item) => item?.day === today)
				: { task: [{ description: "" }] }
		);
	}, [days?.length, today, step]);

	const getDaysFromServer = async () => {
		const res = await getDays(community);
		setDays(Object?.values(res?.data || {}));
	};
	console.log("todayData _________ ", todayData);

	const feedBackHandler = async (text: string) => {
		setErrorMessage({
			message: "",
			type: "",
		});
		setFeedback(text);
	};

	const submit = async () => {
		setErrorMessage({
			message: "",
			type: "",
		});

		if (todayData?.task[step - 1]?.feedBack && !feedBack) {
			setErrorMessage({
				message: "Обовязково заповніть поле відгуку",
				type: "feedBack",
			});
			return;
		}

		if (todayData?.task[step - 1]?.type === "photo" && !urlPhotoFromUser) {
			setErrorMessage({ message: "Обовязково зробіть фото", type: "photo" });
			return;
		}

		if (step + 1 <= +todayData?.steps) {
			setStep((prev) => prev + 1);
		} else {
			setStep(1); // на початок дня
		}
		//обнулення
		setUrlPhotoFromUser("");
		setFeedback("");
	};

	const scrollToEnd = (event) => {
		if (scrollRef) {
			const { x, width, y, height } = event?.nativeEvent?.layout;
			if (!!errorMessage.message) {
				scrollRef?.current?.scrollTo({ y: height, animated: true });
			}
		}
	};

	return (
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
						ref={scrollRef}
						contentContainerStyle={{
							flexGrow: 1,
							justifyContent: "center",
						}}
						style={{ width: "100%" }}
					>
						<StyledText color="white" size={42}>
							{`День ${todayData?.day || ""}`}
						</StyledText>

						<View
							style={{
								flex: 1,
								justifyContent: "center",
							}}
							onLayout={(event) => scrollToEnd(event)}
						>
							{!!isCameraLaunch ? (
								<MyCamera
									setUrlPhotoFromUser={setUrlPhotoFromUser}
									setIsCameraLaunch={setIsCameraLaunch}
								/>
							) : (
								<>
									{/****** image ********/}
									{!!todayData?.task[step - 1]?.photoURL && (
										<Image
											source={{ uri: todayData?.task[step - 1]?.photoURL }}
											style={styles.image}
										/>
									)}

									{/****** description ********/}
									<StyledText size={26} color="white">
										{`${todayData?.task[step - 1]?.description || ""}`}
									</StyledText>

									{/****** make photo ********/}
									{!!urlPhotoFromUser && (
										<View
											style={{ justifyContent: "center", alignItems: "center" }}
										>
											<Image
												source={{ uri: urlPhotoFromUser }}
												style={styles.imageFromUser}
											/>
										</View>
									)}

									{!!todayData?.task[step - 1]?.feedBack && (
										<>
											<StyledText size={16} color="white" marginTop={16}>
												Напишіть тут свій вігук
											</StyledText>
											<Input
												marginTop={4}
												multiline
												maxLength={280}
												height={100}
												placeholder="Напишіть тут"
												onChangeText={feedBackHandler}
												value={feedBack}
											/>
											{!!errorMessage?.message &&
												errorMessage?.type === "feedBack" && (
													<StyledText size={14} color="#f56e27" marginTop={2}>
														{errorMessage?.message}
													</StyledText>
												)}
										</>
									)}

									{/****** make photo ********/}
									{todayData?.task[step - 1]?.type === "photo" && (
										<View
											style={{ justifyContent: "center", alignItems: "center" }}
										>
											<Button
												isIconPhoto
												onPress={() => {
													setErrorMessage({ message: "", type: "" });
													setIsCameraLaunch((prev) => !prev);
												}}
												marginTop={24}
												width={48}
												height={48}
											/>
											<StyledText size={16} marginTop={4} color="white">
												{urlPhotoFromUser ? "Обновіть фото" : `Зробіть фото`}
											</StyledText>
											{!!errorMessage?.message &&
												errorMessage?.type === "photo" && (
													<StyledText size={14} color="#f56e27" marginTop={2}>
														{errorMessage?.message}
													</StyledText>
												)}
										</View>
									)}
								</>
							)}
						</View>
					</ScrollView>
				) : (
					<Menu navigation={navigation} setSettings={setSettings} />
				)}
			</View>
			<Button
				onPress={submit}
				marginTop={24}
				width="80%"
				title={step + 1 <= +todayData?.steps ? `Продовжити` : `Завершити`}
			/>
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
	settingsIcon: {
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		left: "42%",
	},
	content: {
		height: "75%",
		width: "85%",
		backgroundColor: "rgba(0,0,0,0.8)",
		borderRadius: 12,
		alignItems: "center",
		padding: 10,
	},

	image: {
		marginVertical: 8,
		height: 200,
		width: "90%",
		alignSelf: "center",
		borderRadius: 8,
	},
	imageFromUser: {
		marginVertical: 8,
		height: 300,
		width: "90%",
		alignSelf: "center",
		borderRadius: 8,
	},
});
