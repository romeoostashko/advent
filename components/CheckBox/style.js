import styled from "styled-components/native";

export const Wrapper = styled.TouchableWithoutFeedback`
	width: 100%;
	flex-direction: row;
`;

export const Row = styled.View`
	flex-direction: row;

	align-items: center;
`;

export const CheckBoxWrapper = styled.View`
	height: 24px;
	width: 24px;
	background-color: ${({ checked, color }) => (checked ? color : "#fff")};
	border-width: 1px;
	border-color: #f0f0f0;
	border-radius: 4px;
	justify-content: center;
	align-items: center;
	margin-right: 12px;
`;
