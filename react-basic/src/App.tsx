import { useState } from "react"

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
        </div>
    )
}

export default App
