import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export const Input = ({
	onChangeText,
	placeholder = "text",
	marginTop = 0,
	width = "100%",
	defValue = "",
	value = "",
}: {
	onChangeText: (text: string) => void;
	placeholder?: string;
	marginTop?: number;
	width?: number | string | null;
	defValue?: string;
	value: string;
}) => {
	const [inputData, setInputData] = useState<String>(defValue);

	const textHandler = (text: string) => {
		onChangeText(text);
	};

	return (
		<View
			style={{
				width: width,
				height: 52,
				backgroundColor: "rgba(255,255,255,0.6)",
				borderRadius: 8,
				marginTop: marginTop,
			}}
		>
			<TextInput
				placeholder={placeholder}
				maxLength={18}
				style={{
					width: "100%",
					height: 52,
					paddingHorizontal: 8,
					fontFamily: "philosopher-regular",
					fontSize: 20,
				}}
				onChangeText={textHandler}
				value={value}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
