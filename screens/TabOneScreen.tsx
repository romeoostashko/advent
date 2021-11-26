import React, { useEffect, useState, useRef, useCallback } from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { ReduxType } from "../redux/reducer";
import {
	getDays,
	setProgress,
	setEnd,
	getProgressDay,
	getAllCommunity,
	clearProgress,
} from "../api/api";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";
import { StyledText, Button, Menu, Input } from "../components";
import { MyCamera } from "./Camera";
import { Player } from "./Player";
import { intervalToDuration, isDate } from "date-fns";
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
	const [today, setToday] = useState(
		intervalToDuration({
			start: new Date(2021, 10, 24, 24, 0, 0),
			end: new Date(),
		})?.days + 1
	);
	const [todayData, setTodayData] = useState({ task: [{ description: "" }] });
	const [step, setStep] = useState(1);
	const [isCameraLaunch, setIsCameraLaunch] = useState(false);
	const [urlPhotoFromUser, setUrlPhotoFromUser] = useState("");
	const [feedBack, setFeedback] = useState("");
	const [dayIsFinished, setDayIsFinished] = useState(false);
	const [videoIsWotched, setVideoIsWotched] = useState(false);
	const settingsHandler = () => setSettings((prev) => !prev);
	const community = useSelector(
		(state: ReduxType) => state?.myCommunityObj?.name
	);
	const user = useSelector((state: ReduxType) => state?.user?.name);

	console.log("today", today, dayIsFinished, step);
	const withWindow = (Dimensions.get("window").width * 0.85 * 0.9) / 4;

	useFocusEffect(
		useCallback(() => {
			getDaysFromServer();
		}, [])
	);

	useEffect(() => {
		getDaysFromServer();
		/*setToday(
			intervalToDuration({
				start: new Date(2021, 10, 15, 24, 0, 0),
				end: new Date(),
			})?.days + 1
		);*/
	}, [today]);

	useEffect(() => {
		setTodayData(
			!!days?.length
				? days?.find((item) => item?.day == today)
				: { task: [{ description: "" }] }
		);
		getThisStatusDay();
	}, [days?.length, today, step]);

	const getDaysFromServer = async () => {
		const res = await getDays(community);
		setDays(Object?.values(res?.data || {}));
	};
	//console.log("todayData _________ ", todayData);

	const getThisStatusDay = async () => {
		const r = await getProgressDay(today, community, user);
		setDayIsFinished(!!r?.data?.status ? true : false);
	};

	const feedBackHandler = async (text: string) => {
		setErrorMessage({
			message: "",
			type: "",
		});
		setFeedback(text);
	};

	const clearProgressDay = async () => {
		await clearProgress(today, step, community, user);
		getDaysFromServer();
		getThisStatusDay();
		setStep(1);
	};

	//region [rgba(45,45,0,0.2)] SUBMIT
	const submit = async () => {
		setErrorMessage({
			message: "",
			type: "",
		});

		if (todayData?.task[step - 1]?.type === "video" && !videoIsWotched) {
			setErrorMessage({
				message: "Обовязково подивіться відео докінця",
				type: "video",
			});
			return;
		}

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
			await setEnd(today, community, user);
			setDayIsFinished(true);
			setStep(1);
		}
		await setProgress(
			{
				feedBackFromUser: feedBack,
				urlPhotoFromUser,
				photoURL: todayData?.task[step - 1]?.photoURL,
				type: todayData?.task[step - 1]?.type,
				status: true,
				description: todayData?.task[step - 1]?.description,
				step,
			},
			today,
			step,
			community,
			user
		);
		//обнулення
		setUrlPhotoFromUser("");
		setFeedback("");
	};
	//endregion

	const scrollToEnd = (event) => {
		if (scrollRef) {
			const { x, width, y, height } = event?.nativeEvent?.layout;
			if (!!errorMessage.message) {
				scrollRef?.current?.scrollTo({ y: height, animated: true });
			}
		}
	};

	const PhotoFromUser = () => (
		<>
			{!!urlPhotoFromUser && (
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						source={{ uri: urlPhotoFromUser }}
						style={styles.imageFromUser}
					/>
				</View>
			)}
		</>
	);

	const ShowImage = () => (
		<>
			{/****** image ********/}
			{!!todayData?.task[step - 1]?.photoURL && (
				<Image
					source={{ uri: todayData?.task[step - 1]?.photoURL }}
					style={[styles.image, { height: withWindow * 3 }]}
				/>
			)}
		</>
	);

	const ShowVideo = () => (
		<>
			{/****** image ********/}
			{!!todayData?.task[step - 1]?.videoURL && (
				<Player
					setErrorMessage={setErrorMessage}
					videoId={todayData?.task[step - 1]?.videoURL}
					navigation={navigation}
					setVideoIsWotched={setVideoIsWotched}
				/>
			)}
		</>
	);

	const ShowDescription = () => (
		<>
			{/****** description ********/}
			<StyledText size={26} color="white">
				{`${todayData?.task[step - 1]?.description || ""}`}
			</StyledText>
		</>
	);

	const ErrorFeedback = () => (
		<>
			{!!errorMessage?.message && errorMessage?.type === "feedBack" && (
				<StyledText size={14} color="#f56e27" marginTop={2}>
					{errorMessage?.message}
				</StyledText>
			)}
		</>
	);

	const ErrorVideo = () => (
		<>
			{!!errorMessage?.message && errorMessage?.type === "video" && (
				<StyledText size={14} color="#f56e27" marginTop={2}>
					{errorMessage?.message}
				</StyledText>
			)}
		</>
	);

	const ErrorMakePhoto = () => (
		<>
			{!!errorMessage?.message && errorMessage?.type === "photo" && (
				<StyledText size={14} color="#f56e27" marginTop={2}>
					{errorMessage?.message}
				</StyledText>
			)}
		</>
	);

	const MakePhoto = useCallback(
		({ condition, setErrorMessage, setIsCameraLaunch, urlPhotoFromUser }) => (
			<>
				{/****** make photo ********/}
				{condition && (
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}
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
						<ErrorMakePhoto />
					</View>
				)}
			</>
		),
		[ErrorMakePhoto]
	);

	const HeaderDay = useCallback(
		({ day }) => (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => {
						setToday((prev) => (prev > 1 ? prev - 1 : prev));
						getThisStatusDay();
					}}
				>
					<MaterialIcons name="arrow-back-ios" size={24} color="white" />
				</TouchableOpacity>
				<StyledText color="white" size={42} marginLeft={12} marginRight={12}>
					{day}
				</StyledText>
				<TouchableOpacity
					onPress={() => {
						getThisStatusDay();
						setToday((prev) => (prev < 25 ? prev + 1 : prev));
					}}
				>
					<MaterialIcons name="arrow-forward-ios" size={24} color="white" />
				</TouchableOpacity>
			</View>
		),
		[]
	);

	//---------
	return (
		<ImageBackground
			style={[styles.imageBackground]}
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
						<HeaderDay day={`День ${todayData?.day || ""}`} />

						<View
							style={{
								flex: 1,
								justifyContent: "center",
							}}
							onLayout={(event) => scrollToEnd(event)}
						>
							{/* день НЕ закінчений*/}
							{!dayIsFinished && (
								<>
									{!!isCameraLaunch ? (
										<MyCamera
											setUrlPhotoFromUser={setUrlPhotoFromUser}
											setIsCameraLaunch={setIsCameraLaunch}
										/>
									) : (
										<>
											<ShowImage />
											<ShowDescription />
											<ShowVideo />
											<ErrorVideo />
											<PhotoFromUser />
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
													<ErrorFeedback />
												</>
											)}
											<MakePhoto
												condition={todayData?.task[step - 1]?.type === "photo"}
												setErrorMessage={setErrorMessage}
												setIsCameraLaunch={setIsCameraLaunch}
												urlPhotoFromUser={urlPhotoFromUser}
											/>
										</>
									)}
								</>
							)}
							{dayIsFinished && (
								<View
									style={{ justifyContent: "center", alignItems: "center" }}
								>
									<StyledText size={24} color="white" marginTop={0}>
										Вітаю,
									</StyledText>
									<StyledText size={24} color="white" marginTop={0}>
										день закінчений.
									</StyledText>
									<TouchableOpacity
										onPress={clearProgressDay}
										style={{
											borderWidth: 2,
											borderColor: "white",
											width: "90%",
											padding: 5,
											marginTop: 8,
										}}
									>
										<StyledText size={24} color="white" marginTop={0}>
											Очистити прогрес дня
										</StyledText>
									</TouchableOpacity>
								</View>
							)}
						</View>
					</ScrollView>
				) : (
					<Menu navigation={navigation} setSettings={setSettings} />
				)}
			</View>
			{!dayIsFinished && (
				<Button
					disabled={dayIsFinished}
					onPress={submit}
					marginTop={24}
					width="80%"
					title={step + 1 <= +todayData?.steps ? `Продовжити` : `Завершити`}
				/>
			)}
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
