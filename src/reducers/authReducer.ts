import { SetTokenAction } from "../actions/authActions";

export interface AuthState {
  token: string | null;
}
const initialState: AuthState = {
  token: null,
};
const authReducer = (state = initialState, action: SetTokenAction) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
export default authReducer;
