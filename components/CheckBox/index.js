import React, { useState } from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyledText } from "../StyledText";
import { Wrapper, CheckBoxWrapper, Row } from "./style";

export const CheckBox = ({
	title = "title CheckBox",
	isChecked = true,
	onChange = () => {},
	color = "#f56e27",
	textSize = 18,
	styleContainer = {},
	textColor = "white",
	marginTop = 0,
}) => {
	const [checked, setChecked] = useState(true);
	return (
		<View style={[{ marginTop: marginTop }, styleContainer]}>
			<Wrapper
				onPress={() => {
					// setChecked(!checked);
					onChange();
				}}
			>
				<Row>
					<CheckBoxWrapper color={color} checked={isChecked}>
						{isChecked && <AntDesign name="check" size={24} color="white" />}
					</CheckBoxWrapper>
					<StyledText
						align="left"
						width="80%"
						color={textColor}
						size={textSize}
					>
						{title}
					</StyledText>
				</Row>
			</Wrapper>
		</View>
	);
};
