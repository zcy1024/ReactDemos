import { useNavigate, useSearchParams } from "react-router-dom"
import { useDetail } from "./useDetail"
import { NavBar } from "antd-mobile"

export default function Detail() {
    const [params] = useSearchParams()
    const id = params.get("id")

    const { detail } = useDetail({id: id!})

    // console.log(detail)

    const navigate = useNavigate()
    const back = () => {
        navigate(-1)
    }

    if (!detail) {
        return <div>loading...</div>
    }

    return (
        <div>
            <NavBar onBack={back}>{detail?.title}</NavBar>
            <div dangerouslySetInnerHTML={{
                __html: detail?.content
            }}></div>
        </div>
    )
}