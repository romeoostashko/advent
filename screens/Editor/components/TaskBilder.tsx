import React, { useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { StyledText, CustomPicker, Input, CheckBox } from "../../../components";
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
							{ value: "Readtext", label: "Текст" },
							{ value: "action", label: "Дія" },
						]}
					/>
				</>
			)}
			{type === "video" && (
				<>
					<StyledText size={16} color="white" marginTop={16}>
						Опишіть завдання (текст завдання)
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
			)}
		</>
	);
};

const styles = StyleSheet.create({});
