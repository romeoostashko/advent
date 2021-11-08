/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import TabTwoScreen from "../screens/TabTwoScreen";
import {
	Player,
	Login,
	MyCamera,
	TabOneScreen,
	Registration,
	AddNewClub,
	SelectCommunity,
	StartScreen,
	Editor,
} from "../screens";

import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Auth = createNativeStackNavigator();

function RootNavigator() {
	return (
		<Auth.Navigator initialRouteName="StartScreen">
			<Auth.Screen
				name="Root"
				component={HomeNavigator}
				options={{ headerShown: false }}
			/>

			<Auth.Screen
				name="yPlayer"
				component={Player}
				options={{ headerShown: false }}
			/>
			<Auth.Screen
				name="MyCamera"
				component={MyCamera}
				options={{ headerShown: false }}
			/>
			<Auth.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<Auth.Screen
				name="Registration"
				component={Registration}
				options={{ headerShown: false }}
			/>
			<Auth.Screen
				name="AddNewClub"
				component={AddNewClub}
				options={{ headerShown: false }}
			/>
			<Auth.Screen
				name="SelectCommunity"
				component={SelectCommunity}
				options={{ headerShown: false }}
			/>

			<Auth.Screen
				name="StartScreen"
				component={StartScreen}
				options={{ headerShown: false }}
			/>
		</Auth.Navigator>
	);
}

const Home = createNativeStackNavigator();

function HomeNavigator() {
	return (
		<Home.Navigator initialRouteName="TabOne">
			<Home.Screen
				name="TabOne"
				component={TabOneScreen}
				options={{ headerShown: false }}
			/>

			<Home.Screen
				name="TabTwo"
				component={TabTwoScreen}
				options={{ headerShown: false }}
			/>
			<Home.Screen
				name="Editor"
				component={Editor}
				options={{ headerShown: false }}
			/>
		</Home.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
