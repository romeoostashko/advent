const init = {
	myCommunityObj: {},
	user: { name: "", password: "", photo: "" },
	taskFromEditor: { task: [] },
};
/********************* CONSTANTS *********************** */
//region CONSTANTS
const SET_MYCOMMUNITY = "SET_MYCOMMUNITY";
const SET_USER = "SET_USER";
const SET_TASK_EDITOR = "SET_TASK_EDITOR";
//endregion
/********************* Types *********************** */
//region Types

export type ReduxType = {
	myCommunityObj: { name: string; password: string };
	user: { name?: string; password?: string; photo?: string; id?: string };
	taskFromEditor: {
		day?: number;
		steps?: number;
		task?: [
			{
				type?: string;
				title?: string;
				photo?: string;
				videoURL?: string;
				description?: string;
				status?: boolean;
				feedBack?: boolean;
				makePhoto?: boolean;
			}
		];
	};
};

type TaskFromEditor = {
	clean?: boolean;
	day?: number;
	steps?: number;
	task?: [
		{
			type?: string;
			title?: string;
			photo?: string;
			videoURL?: string;
			description?: string;
			status?: boolean;
			feedBack?: boolean;
			makePhoto?: boolean;
		}
	];
};

type User = {
	name?: string;
	password?: string;
	photo?: string;
	id?: string;
};

//endregion
/********************* reducer *********************** */
//region reducer
export const reducer = (state = init, action: { type: string; value: any }) => {
	const { type, value } = action;
	switch (type) {
		case SET_MYCOMMUNITY:
			return {
				...state,
				myCommunityObj: { ...state.myCommunityObj, ...value },
			};
		case SET_USER:
			return { ...state, user: { ...state.user, ...value } };

		case SET_TASK_EDITOR:
			const oldTask = state?.taskFromEditor?.task?.length
				? [...state?.taskFromEditor?.task]
				: [];
			return !value?.clean
				? {
						...state,
						taskFromEditor: {
							...state.taskFromEditor,
							task: value?.task?.length ? oldTask.concat(value?.task) : oldTask,
							day: value?.day ? value?.day : state.taskFromEditor?.day,
							steps: value?.steps ? value?.steps : state.taskFromEditor?.steps,
						},
				  }
				: { ...state, taskFromEditor: { task: [] } };

		default:
			return state;
	}
};
//endregion
/********************* Actions *********************** */
//region MycommunityAction

export const setMycommunityAction = (obj: {
	name: string;
	password: string;
}) => ({ type: SET_MYCOMMUNITY, value: obj });

export const setMycommunityRedux =
	(obj: { name: string; password: string }) => (dispatch: any) => {
		dispatch(setMycommunityAction(obj));
	};

//endregion
//**************************************************** */
//region UserAction

export const setUserAction = (obj: User) => ({
	type: SET_USER,
	value: obj,
});

export const setUserRedux = (obj: User) => (dispatch: any) => {
	dispatch(setUserAction(obj));
};

//endregion
//**************************************************** */
//region  task From Editor

export const setTaskFromEditorAction = (obj: TaskFromEditor) => ({
	type: SET_TASK_EDITOR,
	value: obj,
});

export const setTaskFromEditorRedux =
	(obj: TaskFromEditor) => (dispatch: any) => {
		dispatch(setTaskFromEditorAction(obj));
	};

//endregion
//**************************************************** */
