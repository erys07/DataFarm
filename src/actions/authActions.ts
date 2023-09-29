export interface SetTokenAction {
    type: 'SET_TOKEN';
    token: string | null;
  }
  export const setToken = (token: string | null): SetTokenAction => ({
    type: 'SET_TOKEN',
    token,
  });