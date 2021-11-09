import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StyledText, Input, CheckBox } from "../../../components";
export const TextType = ({
	keyboardStatus,
	feedBack,
	setFeedBack,
	setDescription,
	description,
	errorMessage,
}: {
	keyboardStatus: boolean;
	feedBack: boolean;
	setFeedBack: () => void;
	setDescription: () => void;
	description: string;
	errorMessage: string;
}) => {
	return (
		<>
			<StyledText size={16} color="white" marginTop={16}>
				Опишіть завдання (текст) 180 симв.
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
			{!!errorMessage && (
				<StyledText size={14} color="#f56e27" marginTop={2}>
					{errorMessage}
				</StyledText>
			)}

			<>
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
