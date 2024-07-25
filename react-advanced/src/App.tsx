import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useRef, useState } from 'react'
import './App.css'

import { create } from "zustand"

function reducer(state: any, action: any) {
    switch (action.type) {
        case "INC":
            return state + 1
        case "DEC":
            return state - 1
        case "SET":
            return action.payload
        default:
            return state
    }
}

function fib(n: number): number {
    if (n < 3) {
        console.log("fib n < 3...")
        return 1
    }
    return fib(n - 2) + fib(n - 1)
}

const MemoSon = memo(function Son() {
    console.log("son...")
    return (
        <div>
            this is son
        </div>
    )
})

const Input = memo(function Input(props: any) {
    const { onChange } = props
    console.log("input...")
    return <input type='text' onChange={(e: any) => onChange(e.target.value)}></input>
})

const RefInput = forwardRef(function RefInput(props: any, ref: any) {
    const {} = props
    const sonRef = useRef(null)

    const focusInput = () => {
        sonRef.current.focus()
    }

    useImperativeHandle(ref, () => {
        return {
            focusInput
        }
    })

    return <input type='text' ref={sonRef} />
})

// const useCountStore = create((set) => {
//     return {
//         count: 0,
//         // inc: () => set((state: any) => ({ count: state.count + 1 }))
//         // inc: () => set({ count: 100 })
//         inc: () => set((state: any) => {
//             return {
//                 count: state.count + 1
//             }
//         }),
//         channelList: [],
//         fetchGetList: async() => {
//             const res = await fetch("http://geek.itheima.net/v1_0/channels")
//             const jsonRes = await res.json()
//             set({
//                 channelList: jsonRes.data.channels
//             })
//         }
//     }
// })

const countStore = (set: any) => {
    return {
        count: 0,
        // inc: () => set((state: any) => ({ count: state.count + 1 }))
        // inc: () => set({ count: 100 })
        inc: () => set((state: any) => {
            return {
                count: state.count + 1
            }
        })
    }
}

const channelStore = (set: any) => {
    return {
        channelList: [],
        fetchGetList: async() => {
            const res = await fetch("http://geek.itheima.net/v1_0/channels")
            const jsonRes = await res.json()
            set({
                channelList: jsonRes.data.channels
            })
        }
    }
}

const useCountStore = create((...a) => ({
    ...countStore(...a),
    ...channelStore(...a)
}))

function App() {
    const [state, dispatch] = useReducer(reducer, 0)

    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    console.log("渲染...")

    // const res = fib(count1)
    const res = useMemo(() => {
        return fib(count1)
    }, [count1])

    const changeHandler = useCallback((value: string) => console.log(value), [])

    const sonRef = useRef(null)
    const showRef = () => {
        console.log(sonRef)
        sonRef.current.focusInput()
    }

    const { count, inc, channelList, fetchGetList } = useCountStore()

    useEffect(() => {
        fetchGetList()
    }, [fetchGetList])

    return (
        <div>
            <button onClick={() => dispatch({ type: "DEC" })}>-</button>
            {state}
            <button onClick={() => dispatch({ type: "INC" })}>+</button>
            <button onClick={() => dispatch({ type: "SET", payload: 100 })}>update</button>
            <br />
            <button onClick={() => setCount1(count1 + 1)}>{count1}</button>
            <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
            <br />
            {res}
            <br />
            {/* <Son /> */}
            <MemoSon />
            <br />
            <Input onChange={changeHandler} />
            <br />
            <RefInput ref={sonRef} />
            <button onClick={showRef}>show</button>
            <br />
            <button onClick={inc}>{count}</button>
            <br />
            { channelList.map((item: any) => item.name) }
        </div>
    )
}

export default App
