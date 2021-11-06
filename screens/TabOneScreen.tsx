import * as React from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import { RootTabScreenProps } from "../types";
import { StyledText, Button } from "../components";
const image = require("../assets/images/HomeBG.png");

export const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
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
					height: "70%",
					width: "80%",
					backgroundColor: "rgba(0,0,0,0.8)",

					borderRadius: 12,
					alignItems: "center",
					justifyContent: "flex-end",

					padding: 10,
				}}
			>
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
						</StyledText>
					</View>
				</ScrollView>
			</View>
			<Button marginTop={24} width="80%" title="Виконано" />
		</ImageBackground>
	);
};

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
