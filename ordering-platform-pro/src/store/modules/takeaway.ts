import { createSlice, Dispatch, UnknownAction } from '@reduxjs/toolkit'
import axios from 'axios'

const foodStore = createSlice({
    name: "foods",
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: new Array<object>()
    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        setActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        addCart(state, action) {
            const item: any = state.cartList.find((item: any) => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        increCount(state, action) {
            const item: any = state.cartList.find((item: any) => item.id === action.payload)
            item.count++
        },
        decreCount(state, action) {
            const item: any = state.cartList.find((item: any) => item.id === action.payload)
            if (--item.count === 0) {
                const index = state.cartList.indexOf(item)
                state.cartList.splice(index, 1)
            }
        },
        clearCartList(state) {
            state.cartList.splice(0, state.cartList.length)
        }
    }
})

const { setFoodsList, setActiveIndex, addCart, increCount, decreCount, clearCartList } = foodStore.actions

const fetchFoodsList = () => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        const res = await axios.get("http://localhost:3004/takeaway")
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodsList, setActiveIndex, addCart, increCount, decreCount, clearCartList }

const reducer = foodStore.reducer

export default reducer