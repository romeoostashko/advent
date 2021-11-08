import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export const Input = ({
	onChangeText,
	placeholder = "text",
	marginTop = 0,
	width = "100%",
	defValue = "",
	value = "",
	height = 52,
	maxLength = 18,
	multiline = false,
	onFocus = () => {},
}: {
	onChangeText: (text: string) => void;
	placeholder?: string;
	marginTop?: number;
	width?: number | string | null;
	defValue?: string;
	value: string;
	height?: number;
	maxLength?: number;
	multiline?: boolean;
	onFocus?: () => void;
}) => {
	const [inputData, setInputData] = useState<String>(defValue);

	const textHandler = (text: string) => {
		onChangeText(text);
	};

	return (
		<View
			style={{
				width: width,
				height: height,
				backgroundColor: "rgba(255,255,255,0.6)",
				borderRadius: 8,
				marginTop: marginTop,
			}}
		>
			<TextInput
				onFocus={onFocus}
				placeholder={placeholder}
				maxLength={maxLength}
				multiline={multiline}
				style={{
					width: "100%",
					height: height,
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
