import React from "react";
import { StyleSheet } from "react-native";
import { StyledText, CustomPicker } from "../../../components";

const valueDays = () => {
	return new Array(25)
		.fill("")
		.map((item, i) => ({ value: i + 1, label: `День ${i + 1}` }));
};

export const ProgressZero = ({
	setDay,
	day,
	setSteps,
	steps,
	daysCompleted,
}: {
	setDay: () => void;
	day: number;
	setSteps: () => void;
	steps: number;
	daysCompleted: [];
}) => {
	//console.log("day", day, steps);

	const dayForRender = valueDays().map((i) =>
		daysCompleted?.includes(i.label)
			? {
					...i,
					label: i.label + " (додано, можна редагувати)",
					color: "#8e5a3e",
			  }
			: i
	);

	return (
		<>
			<StyledText size={16} color="white">
				День
			</StyledText>
			<CustomPicker
				itemStyle={{ color: "#ccc" }}
				onValueChange={setDay}
				selectedValue={day.toString()}
				values={dayForRender}
			/>

			<StyledText marginTop={32} size={16} color="white">
				Кількість кроків (завдань) на день
			</StyledText>
			<CustomPicker
				onValueChange={setSteps}
				selectedValue={steps.toString()}
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
