import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync();

				// Load fonts
				await Font.loadAsync({
					...FontAwesome.font,
					"space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
					"c-regular": require("../assets/fonts/Caveat-Regular.ttf"),
					"c-medium": require("../assets/fonts/Caveat-Medium.ttf"),
					"c-semiBold": require("../assets/fonts/Caveat-SemiBold.ttf"),
					"c-bold": require("../assets/fonts/Caveat-Bold.ttf"),

					"philosopher-bold": require("../assets/fonts/Philosopher-Bold.ttf"),
					"philosopher-boldItalic": require("../assets/fonts/Philosopher-BoldItalic.ttf"),
					"philosopher-italic": require("../assets/fonts/Philosopher-Italic.ttf"),
					"philosopher-regular": require("../assets/fonts/Philosopher-Regular.ttf"),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hideAsync();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return isLoadingComplete;
}
