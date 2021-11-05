import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	SafeAreaView,
} from "react-native";
import { signUp, getAllUsers } from "../api/api";
import { storeMyLoginData, getMyLoginData } from "../api/asyncStorage";
import { Button, Input, StyledText } from "../components";

export const Login = () => {
	const image = require("../assets/images/LoginBG.png");
	return (
		<ImageBackground
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
			source={image}
			resizeMode="cover"
		>
			<View
				style={{
					height: "85%",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<StyledText color="white" size={32}>
					Diamant Advent
				</StyledText>
				<View
					style={{
						width: "80%",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0,0,0,0.4)",
						padding: 16,
						borderRadius: 8,
					}}
				>
					<StyledText width="100%" color="white" size={16}>
						Імя, яке ви раніше зареєстрували в програмі
					</StyledText>
					<Input placeholder="Ваше ім'я" marginTop={16} />
					<Button marginTop={24} title="Вхід" />
				</View>
				<StyledText color="white">Зареєструватися</StyledText>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({});
