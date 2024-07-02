import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
    name: "counter",
    initialState: {
        count: 0
    },
    reducers: {
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        },
        addNum(state, action) {
            state.count += action.payload
        }
    }
})

const {increment, decrement, addNum} = counterStore.actions
const counterReducer = counterStore.reducer

export {increment, decrement, addNum}
export default counterReducer