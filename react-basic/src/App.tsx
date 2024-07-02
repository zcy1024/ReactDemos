import { createContext, useContext, useEffect, useRef, useState } from "react"

import "./App.css"

const articleType = 0 // 0 1 3
function getArticleTem() {
    if (articleType == 0) {
        return (
            <div>zero picture</div>
        )
    } else if (articleType == 1) {
        return (
            <div>one picture</div>
        )
    } else if (articleType == 3) {
        return (
            <div>three pictures</div>
        )
    } else {
        return (
            <div>no article type</div>
        )
    }
}

// 组件 => 首字母大写的函数
function Button() {
    return <button>click me</button>
}
const Buttonone = () => {
    return <button>click one!</button>
}

function Son(props: any) {
    console.log(props)
    const meg = "this is message from son"
    return (
        <div>
            this is son, {props.name}, {props.children}
            <button onClick={() => props.onPrintMeg(meg)}>sendMeg</button>
        </div>
    )
}

function A(props: any) {
    const name = "this is B name from A"

    return (
        <div>
            this is A compnent,
            <button onClick={() => props.onGetAName(name)}>send</button>
        </div>
    )
}

function B(props: any) {
    return (
        <div>
            this is B compnent, {props.name}
        </div>
    )
}

const MsgContext = createContext("")

function C() {
    return (
        <div>
            <D />
        </div>
    )
}

function D() {
    const msg: any = useContext(MsgContext)
    return (
        <div>
            this is D compnent, {msg}
        </div>
    )
}

function Timing() {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Timing...")
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return <div>this is Timing</div>
}

function useToggle() {
    const [boolCheck, setBoolCheck] = useState(true)
    const toggle = () => setBoolCheck(!boolCheck)
    return {
        boolCheck,
        toggle
    }
}

function App() {
    const [count, setCount] = useState(0);
    const [form, setForm] = useState({name: 'Alice'})
    const [array, setArray] = useState([1, 2, 3])

    const message = "this is message"
    const list = [
        {id: 1001, name: "Vue"},
        {id: 1002, name: "React"},
        {id: 1003, name: "Angular"}
    ]
    const isLogin = false
    const clickHandler = (e: any) => {
        console.log("click button", e)
    }
    const clickHandleName = (name: string, e: any) => {
        console.log("Hello", name, e)
    }
    const clickAddCount = () => {
        setCount(count + 1)
    }
    const clickChangeForm = () => {
        let newName = form.name === "Alice" ? "Bob" : "Alice"
        setForm({
            ...form, // 展开form，后面的属性有同名的则替换
            name: newName,
        })
    }
    const clickChangeArray = () => {
        array[array.length - 1] = -1
        setArray([...array, 999])
    }
    const style = {
        color: "red",
        fontSize: "50px"
    }

    const [value, setValue] = useState('')

    const inputRef = useRef(null)
    const testRef = () => {
        console.log(inputRef.current)
        console.dir(inputRef.current)
    }

    const sonName = "this is son from App"
    const [meg, setMeg] = useState("this is span in son")
    const printMeg = (meg: string) => {
        console.log(meg)
        setMeg(meg)
    }

    const [bName, setBName] = useState('')
    // const getAName = (name: string) => {
    //     // console.log(name)
    //     setBName(name)
    // }

    const URL = "https://geek.itheima.net/v1_0/channels"
    const [fetchList, setFetchList] = useState([])
    useEffect(() => {
        async function getList() {
            const res = await fetch(URL)
            const list = await res.json()
            console.log(list)
            setFetchList(list.data.channels)
        }
        getList()
    }, [])

    const [showTiming, setShowTiming] = useState(true)

    const {boolCheck, toggle} = useToggle()
    
    return (
        <div>
            <h1>this is App</h1>
            {message}
            {new Date().getDate()}
            <div style={{color: "red"}}>this is div</div>
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
            {isLogin && <span>this is login span</span>}
            {isLogin ? <span>login successful</span> : <span>please login first</span>}
            {getArticleTem()}
            <button onClick={clickHandler}>click me</button>
            <br></br>
            <button onClick={(e) => clickHandleName("Black Myth: WuKong", e)}>hello</button>
            <br />
            <Button />
            <Buttonone></Buttonone>
            <br />
            <button onClick={clickAddCount}>{count}</button>
            <br />
            <button onClick={clickChangeForm}>{form.name}</button>
            <br />
            <button onClick={clickChangeArray}>{array}</button>
            <br />
            <span style={style}>this is style control in line</span>
            <br />
            <span className="styleControl">this is style control in css</span>
            <br />
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}></input>
            <br />
            <input type="text" ref={inputRef} />
            <button onClick={testRef}>testRef</button>
            <br />
            <Son name={sonName} onPrintMeg={printMeg}>
                <span>{meg}</span>
            </Son>
            <br />
            <A onGetAName={setBName} />
            <B name={bName}/>
            <MsgContext.Provider value={bName}>
                <C />
            </MsgContext.Provider>
            <ul>
                {
                    fetchList.map((item: any) => <li key={item.id}>{item.name}</li>)
                }
            </ul>
            { showTiming && <Timing /> }
            <button onClick={() => setShowTiming(!showTiming)}>卸载Timing组件</button>
            <br />
            {boolCheck && <div>this is controled by boolCheck</div>}
            <button onClick={toggle}>control boolCheck</button>
        </div>
    )
}

export default App
