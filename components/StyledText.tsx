import React from "react";
import { StyleSheet, Text } from "react-native";

export const StyledText = ({
	children,
	align = "center",
	color = "black",
	size = 20,
	width = null,
	marginTop = 0,
}: {
	children: React.ReactNode;
	align?: string;
	color?: string;
	size?: number;
	width?: number | string | null;
	marginTop?: number;
}) => {
	return (
		<Text
			style={{
				fontFamily: "philosopher-regular",
				width: width,
				fontSize: size,
				textAlign: align,
				color: color,
				marginTop: marginTop,
			}}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({});
