import React from "react";
import { StyleSheet, Text } from "react-native";

export const StyledText = ({
	children,
	align = "center",
	color = "black",
	size = 22,
	width = null,
}: {
	children: React.ReactNode;
	align?: string;
	color?: string;
	size?: number;
	width?: number | string | null;
}) => {
	return (
		<Text
			style={{
				fontFamily: "philosopher-regular",
				width: width,
				fontSize: size,
				textAlign: align,
				color: color,
			}}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({});
