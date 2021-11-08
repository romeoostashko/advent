import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";
import { StyledText, Button, Menu } from "../components";
const image = require("../assets/images/HomeBG.png");

export const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
	const [isSettings, setSettings] = useState<boolean>(false);
	const settingsHandler = () => setSettings((prev) => !prev);

	return (
		<ImageBackground
			style={styles.imageBackground}
			source={image}
			resizeMode="cover"
		>
			<View style={styles.content}>
				<View style={styles.settingsIcon}>
					<TouchableOpacity onPress={settingsHandler}>
						<Entypo name="dots-three-horizontal" size={32} color="white" />
					</TouchableOpacity>
				</View>
				{!isSettings ? (
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
							justifyContent: "center",
						}}
					>
						<StyledText color="white" size={42}>
							День 1
						</StyledText>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<StyledText size={26} color="white">
								Зробити ялинку з паперу або красиво оформити пляшку поставити в
								неї гілочки покрити сріблястою фарбою, а на них повісити Зробити
								Зробити ялинку з паперу або красиво оформити пляшку поставити в
							</StyledText>
						</View>
					</ScrollView>
				) : (
					<Menu navigation={navigation} setSettings={setSettings} />
				)}
			</View>
			<Button marginTop={24} width="80%" title="Виконано" />
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	settingsIcon: {
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		left: "42%",
	},
	content: {
		height: "75%",
		width: "85%",
		backgroundColor: "rgba(0,0,0,0.8)",
		borderRadius: 12,
		alignItems: "center",

		padding: 10,
	},
});
