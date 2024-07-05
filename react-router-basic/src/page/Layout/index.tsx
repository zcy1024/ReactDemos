import { Link, Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div>
            Layout
            <br />
            {/* <Link to="/board">面板</Link> */}
            <Link to="/">面板</Link>
            <br />
            <Link to="/about">关于</Link>
            <br />
            <Outlet />
        </div>
    )
}