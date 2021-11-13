import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StyledText } from "./StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export const Button = ({
	marginBottom = 0,
	marginTop = 0,
	marginLeft = 0,
	title,
	onPress = () => {},
	width = "100%",
	disabled = false,
	height = 52,
	isIconPhoto = false,
	isIconSave = false,
}: {
	marginBottom?: number;
	marginTop?: number;
	marginLeft?: number;
	title?: string;
	onPress?: () => void;
	width?: number | string | null;
	height?: number | string | null;
	disabled?: boolean;
	isIconPhoto?: boolean;
	isIconSave?: boolean;
}) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			style={{
				width: width,
				height: height,
				marginTop: marginTop,
				marginBottom: marginBottom,
				marginLeft: marginLeft,
			}}
		>
			<LinearGradient
				end={{ x: 1, y: 0 }}
				style={[styles.content, { height: height }]}
				colors={["#f56e27", "#924fa5"]}
			>
				{isIconPhoto && (
					<MaterialIcons name="photo-camera" size={36} color="white" />
				)}
				{isIconSave && <MaterialIcons name="save" size={36} color="white" />}
				{!!title && (
					<StyledText color="#fff" size={26}>
						{title}
					</StyledText>
				)}
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	content: {
		width: "100%",
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
});
