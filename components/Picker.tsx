import React from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
export const CustomPicker = ({
	selectedValue,
	onValueChange,
	values,
}: {
	values: { label: string; value: string | number }[];
	selectedValue: string | number;
	onValueChange: (a: string | number) => void;
}) => {
	return (
		<Picker
			style={styles.picker}
			selectedValue={selectedValue}
			onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
		>
			{values?.map((item: { label: string; value: string | number }) => (
				<Picker.Item
					key={item.value.toString()}
					label={item.label.toString()}
					value={item.value.toString()}
				/>
			))}
		</Picker>
	);
};

const styles = StyleSheet.create({
	picker: {
		marginTop: 8,
		width: "100%",
		backgroundColor: "rgba(255,255,255,0.7)",
		borderRadius: 16,
	},
});
