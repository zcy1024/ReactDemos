import { createSlice, Dispatch, UnknownAction } from "@reduxjs/toolkit"

import axios from "axios"

const channelStore = createSlice({
    name: "channel",
    initialState: {
        channelList: []
    },
    reducers: {
        setChannel(state, action) {
            state.channelList = action.payload
        }
    }
})

const { setChannel } = channelStore.actions

const fetchChanelList = () => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        const res = await axios.get("https://geek.itheima.net/v1_0/channels")
        dispatch(setChannel(res.data.data.channels))
    }
}

export { fetchChanelList }

const channelReducer = channelStore.reducer

export default channelReducer