
const SET_USER = "session/SET_OTHER_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const getOtherUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`);
	if (response.ok) {
	  const data = await response.json();
	  dispatch(setUser(data));
	  return null;
	}
  };


  export default function OtherUserReducer(state = {}, action){
    switch (action.type) {
        case SET_USER:
            return { user: action.payload};
        default:
            return state
    }
  }