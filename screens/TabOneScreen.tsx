import * as React from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
} from "react-native";

import { RootTabScreenProps } from "../types";
import { StyledText } from "../components/StyledText";
import { signUp, getAllUsers } from "../api/api";
export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<"TabOne">) {
	const image = require("../assets/images/background.jpeg");
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
					height: "60%",
					width: "75%",
					backgroundColor: "white",
					elevation: 12,
					borderRadius: 12,
					alignItems: "center",

					padding: 10,
				}}
			>
				<StyledText title>День 1</StyledText>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<StyledText>
						Зробити ялинку з паперу або красиво оформити пляшку поставити в неї
						гілочки покрити сріблястою фарбою, а на них повісити ялинкові
						іграшки
					</StyledText>
				</View>
			</View>
			<View
				style={{
					width: "50%",
					height: 48,
					backgroundColor: "white",
					elevation: 12,
					borderRadius: 12,
					marginTop: 32,
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
						width: "100%",
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={
						async () => {
							const res = await getAllUsers();
							console.log(Object.entries(res.data));
						}

						//() => signUp("Roma")

						//() => navigation.navigate("MyCamera")
					}
				>
					<StyledText>Виконано</StyledText>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
