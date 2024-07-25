import { useEffect, useRef, useState } from "react"

type User = {
    name: string
    age: number
}

// type Props = {
//     className: string
// }

interface Props {
    className: string
    children: React.ReactNode
    onGetMes?: (msg: string) => void
}

function Button(props: Props) {
    const { className, children, onGetMes } = props
    return <button className={className} onClick={() => onGetMes?.("testClick")}>{children}</button>
}

function App() {
    // const [user, setUser] = useState<User>()
    const [user, setUser] = useState<User | null>(null)

    const clickHandler = (msg: string) => {
        console.log(msg)
    }

    const domRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        domRef.current?.focus()
    }, [])

    // ref 做稳定的存储器
    const timerRef = useRef<number | undefined>(undefined)
    useEffect(() => {
        timerRef.current = setInterval(() => {
            console.log("timer...")
        }, 1000)

        return () => clearInterval(timerRef.current)
    }, [])

    return (
        <div>
            {!null && "test"}
            {user?.name}
            {user?.age}
            <br />
            <Button className="testName" onGetMes={clickHandler}>
                <div>test</div>
            </Button>
            <br />
            <input ref={domRef} />
        </div>
    )
}

export default App
