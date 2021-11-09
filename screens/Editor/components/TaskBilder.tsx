import React, { useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { StyledText, CustomPicker, Input, CheckBox } from "../../../components";
import { VideoType } from "./VideoType";
import { TextType } from "./TextType";
import { PhotoType } from "./PhotoType";
export const TaskBilder = ({
	setType,
	type,
	progress,
	setVideoURL,
	videoURL,
	setDescription,
	description,
	keyboardStatus,
	setFeedBack,
	feedBack,
	makePhoto,
	setMakePhoto,
	errorMessage,
}: {
	setType: () => void;
	type: string;
	progress: number;
	setVideoURL: () => void;
	videoURL: string;
	setDescription: () => void;
	description: string;
	keyboardStatus: boolean;
	feedBack: boolean;
	setFeedBack: () => void;
	makePhoto: boolean;
	setMakePhoto: () => void;
	errorMessage: string;
}) => {
	return (
		<>
			{!keyboardStatus && (
				<>
					<StyledText size={16} color="white">
						Виберіть тип завдання
					</StyledText>
					<CustomPicker
						onValueChange={setType}
						selectedValue={type}
						values={[
							{ value: "not selected", label: "Виберіть із списку" },
							{ value: "video", label: "Відео" },
							{ value: "photo", label: "Фото/Дія" },
							{ value: "text", label: "Текст/Дія" },
						]}
					/>
					{!!errorMessage && (type === "not selected" || type === "") && (
						<StyledText size={14} color="#f56e27" marginTop={2}>
							{errorMessage}
						</StyledText>
					)}
				</>
			)}
			{type === "video" && (
				<VideoType
					keyboardStatus={keyboardStatus}
					feedBack={feedBack}
					setFeedBack={setFeedBack}
					videoURL={videoURL}
					setVideoURL={setVideoURL}
					setDescription={setDescription}
					description={description}
					errorMessage={errorMessage}
				/>
			)}
			{type === "text" && (
				<TextType
					keyboardStatus={keyboardStatus}
					feedBack={feedBack}
					setFeedBack={setFeedBack}
					setDescription={setDescription}
					description={description}
					errorMessage={errorMessage}
				/>
			)}
			{type === "photo" && (
				<PhotoType
					keyboardStatus={keyboardStatus}
					feedBack={feedBack}
					setFeedBack={setFeedBack}
					setDescription={setDescription}
					description={description}
					makePhoto={makePhoto}
					errorMessage={errorMessage}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({});
