import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StyledText, CustomPicker, Input, CheckBox } from "../../../components";
export const VideoType = ({
	keyboardStatus,
	feedBack,
	setFeedBack,
	videoURL,
	setVideoURL,
	setDescription,
	description,
	errorMessage,
}: {
	keyboardStatus: boolean;
	feedBack: boolean;
	setFeedBack: () => void;
	videoURL: string;
	setVideoURL: () => void;
	setDescription: () => void;
	description: string;
	errorMessage: string;
}) => {
	return (
		<>
			<StyledText size={16} color="white" marginTop={16}>
				Опишіть завдання (текст завдання) 180 симв.
			</StyledText>
			<Input
				marginTop={4}
				multiline
				maxLength={180}
				height={keyboardStatus ? "50%" : 80}
				placeholder="Опис завдання"
				onChangeText={setDescription}
				value={description}
			/>
			{!!errorMessage && (!description || description.trim()?.length < 10) && (
				<StyledText size={14} color="#f56e27" marginTop={2}>
					{errorMessage}
				</StyledText>
			)}

			<>
				<StyledText size={14} color="white" marginTop={16}>
					Посилання на youtube у форматі https://youtu.be/v0Bkxc3YeIc. В
					результаті ви отримаєте тільки код відео
				</StyledText>
				<Input
					marginTop={4}
					maxLength={80}
					placeholder="url"
					onChangeText={setVideoURL}
					value={videoURL}
				/>
				{!!errorMessage && !videoURL && description.trim()?.length >= 10 && (
					<StyledText size={14} color="#f56e27" marginTop={2}>
						{errorMessage}
					</StyledText>
				)}
				{!keyboardStatus && (
					<CheckBox
						isChecked={feedBack}
						onChange={() => setFeedBack((prev) => !prev)}
						marginTop={16}
						title="Дати можливість написати відгук про завдання"
					/>
				)}
			</>
		</>
	);
};

const styles = StyleSheet.create({});
