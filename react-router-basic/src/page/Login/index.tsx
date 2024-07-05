import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    return (
        <div>
            login
            <Link to="/article">jump to article</Link>
            <button onClick={() => navigate("/article")}>jump to article</button>
            {/* 用searchParams的时候，router里针对Params的配置需要删 */}
            {/* <br />
            <button onClick={() => navigate("/article?id=2024820&name=BlackMyth WuKong")}>searchParams传参</button> */}
            <br />
            <button onClick={() => navigate("/article/2024820/BlackMyth WuKong")}>Params传参</button>
        </div>
    )
}