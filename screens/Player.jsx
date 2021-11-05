import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { StyledText } from "../components";
import YoutubePlayer from "react-native-youtube-iframe";

export const Player = ({ navigation, videoId = "iee2TATGMyI" }) => {
	const [playing, setPlaying] = useState(false);

	const onStateChange = useCallback((state) => {
		if (state === "ended") {
			setPlaying(false);
			navigation.goBack();
			//Alert.alert("video has finished playing!");
		}
	}, []);

	const togglePlaying = useCallback(() => {
		setPlaying((prev) => !prev);
	}, []);

	return (
		<View style={{ justifyContent: "center", flex: 1 }}>
			<View style={{ marginBottom: 24 }}>
				<StyledText align="center">
					В кінці відео ти автоматично повернешся на попередній екран. Дочекайся
					цього моменту
				</StyledText>
			</View>
			<YoutubePlayer
				height={300}
				width="100%"
				play={playing}
				videoId={videoId}
				onChangeState={onStateChange}
			/>
			<Button
				title={playing ? "Пауза" : "Запустити відео"}
				onPress={togglePlaying}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
