import React, { ReactChildren } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StyledText } from "./StyledText";

export const Link = ({
	marginTop = 0,
	children,
	onPress = () => {},
	color = "#fff",
}: {
	marginTop?: number;
	children: string;
	onPress?: () => void;
	color?: string;
}) => {
	return (
		<TouchableOpacity style={{ marginTop: marginTop }} onPress={onPress}>
			<StyledText size={18} color={color}>
				{children}
			</StyledText>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({});
