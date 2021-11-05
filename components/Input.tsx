import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export const Input = ({
	onChangeText,
	placeholder = "text",
	marginTop = 0,
	width = "100%",
}: {
	onChangeText: (text: string) => void;
	placeholder: string;
	marginTop: number;
	width: number | string | null;
}) => {
	const [inputData, setInputData] = useState<String>("");

	const textHandler = (text: string) => {
		setInputData(text);
		onChangeText(text);
	};

	return (
		<View
			style={{
				width: width,
				height: 48,
				backgroundColor: "rgba(255,255,255,0.6)",
				borderRadius: 12,
				marginTop: marginTop,
			}}
		>
			<TextInput
				placeholder={placeholder}
				maxLength={18}
				style={{
					width: "100%",
					height: 48,
					paddingHorizontal: 8,
					fontFamily: "philosopher-regular",
					fontSize: 20,
				}}
				onChangeText={setInputData}
				value={inputData}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
