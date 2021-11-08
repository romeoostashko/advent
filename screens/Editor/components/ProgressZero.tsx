import React from "react";
import { StyleSheet } from "react-native";
import { StyledText, CustomPicker } from "../../../components";
export const ProgressZero = ({
	setDay,
	day,
	setSteps,
	steps,
}: {
	setDay: () => void;
	day: number;
	setSteps: () => void;
	steps: number;
}) => {
	return (
		<>
			<StyledText size={16} color="white">
				День
			</StyledText>
			<CustomPicker
				onValueChange={setDay}
				selectedValue={day}
				values={[
					{ value: 1, label: "День 1" },
					{ value: 2, label: "День 2" },
					{ value: 3, label: "День 3" },
					{ value: 4, label: "День 4" },
				]}
			/>

			<StyledText marginTop={32} size={16} color="white">
				Кількість кроків (завдань) на день
			</StyledText>
			<CustomPicker
				onValueChange={setSteps}
				selectedValue={steps}
				values={[
					{ value: 1, label: "Одне завдання" },
					{ value: 2, label: "Два завдання" },
					{ value: 3, label: "Три завдання" },
				]}
			/>
		</>
	);
};

const styles = StyleSheet.create({});
