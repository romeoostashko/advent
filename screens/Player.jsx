import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { StyledText } from "../components";
import YoutubePlayer from "react-native-youtube-iframe";

export const Player = ({
	navigation,
	videoId = "iee2TATGMyI",
	setVideoIsWotched,
	setErrorMessage,
}) => {
	const [playing, setPlaying] = useState(false);

	const onStateChange = useCallback((state) => {
		if (state === "ended") {
			setPlaying(false);
			//navigation.goBack();
			//Alert.alert("video has finished playing!");
			setVideoIsWotched(true);
		}
	}, []);

	const togglePlaying = useCallback(() => {
		setPlaying((prev) => !prev);
		setErrorMessage({ message: "", type: "" });
	}, []);

	return (
		<View style={{ justifyContent: "center" }}>
			<YoutubePlayer
				height={200}
				width="100%"
				play={playing}
				videoId={videoId}
				onChangeState={onStateChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
