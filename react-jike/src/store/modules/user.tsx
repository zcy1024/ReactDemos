import { createSlice, Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { request, setToken as _setToken, getToken } from "../../utils"

const userStore = createSlice({
    name: "user",
    initialState: {
        token: getToken() || ""
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        }
    }
})

const { setToken } = userStore.actions

const fetchLogin = (loginForm: any) => {
    return async(dispatch: Dispatch<UnknownAction>) => {
        const res = await request.post("/authorizations", loginForm)
        dispatch(setToken(res.data.token))
    }
}

export { setToken, fetchLogin }

export default userStore.reducer