import React from "react";
import { StyleSheet, Text } from "react-native";

export const StyledText = ({
	children,
	align = "center",
	color = "black",
	size = 20,
	width = null,
	marginTop = 0,
	marginLeft = 0,
	marginRight = 0,
}: {
	children: React.ReactNode;
	align?: string;
	color?: string;
	size?: number;
	width?: number | string | null;
	marginTop?: number;
	marginLeft?: number;
	marginRight?: number;
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
				marginLeft: marginLeft,
				marginRight: marginRight,
			}}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({});
