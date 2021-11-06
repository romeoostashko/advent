import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { getMyCommunity, getUserLS } from "../api/asyncStorage";
import { setMycommunityRedux, setUserRedux } from "../redux/reducer";

export const StartScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const start = async () => {
			const getmyCommunityFromLocalStorageToRedux = async () => {
				const community = await getMyCommunity();
				console.log("Start community ", community);
				setMycommunityRedux(community)(dispatch);
				return community.name;
			};

			const getUserFromLocalStorageToRedux = async () => {
				const userLS = await getUserLS();
				console.log("Start userLS ", userLS);
				setUserRedux(userLS)(dispatch);
				return userLS.name;
			};
			const myCommunity = await getmyCommunityFromLocalStorageToRedux();
			const user = await getUserFromLocalStorageToRedux();

			console.log("*** ", myCommunity, user);
			navigation.replace(
				myCommunity && user
					? "Root"
					: myCommunity && !user
					? "Login"
					: "SelectCommunity"
			);
		};

		start();
	}, []);

	return (
		<View>
			<Text></Text>
		</View>
	);
};

const styles = StyleSheet.create({});
