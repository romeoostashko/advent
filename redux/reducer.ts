const init = {
	myCommunityObj: {},
	user: { name: "", password: "", photo: "" },
};
/********************* CONSTANTS *********************** */
//region CONSTANTS
const SET_MYCOMMUNITY = "SET_MYCOMMUNITY";
const SET_USER = "SET_USER";
//endregion
/********************* Types *********************** */
//region Types

export type ReduxType = {
	myCommunityObj: { name: string; password: string };
	user: { name?: string; password?: string; photo?: string; id?: string };
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
		case "SET_MYCOMMUNITY":
			return {
				...state,
				myCommunityObj: { ...state.myCommunityObj, ...value },
			};
		case "SET_USER":
			return { ...state, user: { ...state.user, ...value } };

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
