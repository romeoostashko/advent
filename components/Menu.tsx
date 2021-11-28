import React from "react";
import { View, TouchableOpacity } from "react-native";
import { StyledText } from "./StyledText";
import { cleanUserLS, cleanMyCommunityLS } from "../api/asyncStorage";

export const Menu = ({
	navigation,
	isEditor,
	setSettings,
}: {
	navigation: any;
	isEditor?: boolean;
	setSettings?: (a: boolean) => void;
}) => {
	const menu = [
		{
			title: "Розлогінитись",
			onPress: async () => {
				await cleanUserLS();
				navigation.replace("Login");
			},
		},
		{
			title: "Вийти з туси",
			onPress: async () => {
				await cleanMyCommunityLS();
				navigation.replace("SelectCommunity");
			},
		},
	];

	return (
		<View style={{ width: "100%", alignItems: "center" }}>
			{menu.map((item) => (
				<TouchableOpacity
					key={item.title}
					onPress={item.onPress}
					style={{
						width: "80%",
						height: 42,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(255,255,255,0.8)",
						borderRadius: 8,
						marginTop: 16,
					}}
				>
					<StyledText size={26}>{item.title}</StyledText>
				</TouchableOpacity>
			))}
		</View>
	);
};
