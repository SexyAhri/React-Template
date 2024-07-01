import { getWeather } from "../../../api/index";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users: any) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: any) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = () => async (dispatch: any) => {
  try {
    dispatch(fetchUsersRequest());
    const response = await getWeather();
    dispatch(fetchUsersSuccess(response));
  } catch (error: any) {
    dispatch(fetchUsersFailure(error.message));
  }
};
