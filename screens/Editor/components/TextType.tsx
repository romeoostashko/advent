import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { StyledText, Input, CheckBox, Button } from "../../../components";
import { pickImage } from "../../../commonFunctions";

export const TextType = ({
	keyboardStatus,
	feedBack,
	setFeedBack,
	setDescription,
	description,
	errorMessage,
	setPhotoURL,
	photoURL,
}: {
	keyboardStatus: boolean;
	feedBack: boolean;
	setFeedBack: () => void;
	setDescription: () => void;
	description: string;
	errorMessage: string;
	setPhotoURL: () => void;
	photoURL: string;
}) => {
	const [loaded, setLoaded] = useState(false);

	const imageHadler = async () => {
		setLoaded(true);
		const res = await pickImage();
		setPhotoURL(res);
		setLoaded(false);
	};

	return (
		<>
			<StyledText size={16} color="white" marginTop={16}>
				URL фото для показу в завданні, або залишіть пустим
			</StyledText>
			{!loaded ? (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Input
						width="80%"
						marginTop={4}
						maxLength={1000}
						height={52}
						placeholder="фото URL"
						onChangeText={setPhotoURL}
						value={photoURL}
					/>
					<Button
						isIconPhoto
						onPress={imageHadler}
						width="15%"
						marginLeft={4}
					/>
				</View>
			) : (
				<ActivityIndicator size="large" color="white" />
			)}
			<StyledText size={16} color="white" marginTop={16}>
				Опишіть завдання (текст) 1000 симв.
			</StyledText>
			<Input
				marginTop={4}
				multiline
				maxLength={1000}
				height={keyboardStatus ? 150 : 80}
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
