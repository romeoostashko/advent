import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StyledText } from "./StyledText";

export const Button = ({
	marginTop = 0,
	title,
	onPress = () => {},
	width = "100%",
}: {
	marginTop: number;
	title: string;
	onPress: () => void;
	width: number | string | null;
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ width: width, height: 50, marginTop: marginTop }}
		>
			<View
				style={{
					width: "100%",
					height: 50,
					backgroundColor: "#fff",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 16,
				}}
			>
				<StyledText>{title}</StyledText>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({});
