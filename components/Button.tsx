import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StyledText } from "./StyledText";
import { LinearGradient } from "expo-linear-gradient";

export const Button = ({
	marginTop = 0,
	title,
	onPress = () => {},
	width = "100%",
	disabled = false,
}: {
	marginTop?: number;
	title: string;
	onPress?: () => void;
	width?: number | string | null;
	disabled?: boolean;
}) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			style={{ width: width, height: 52, marginTop: marginTop }}
		>
			<LinearGradient
				end={{ x: 1, y: 0 }}
				style={styles.content}
				colors={["#f56e27", "#924fa5"]}
			>
				<StyledText color="#fff" size={26}>
					{title}
				</StyledText>
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	content: {
		width: "100%",
		height: 52,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
});
