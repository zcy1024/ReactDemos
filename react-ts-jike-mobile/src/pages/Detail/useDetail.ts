import { DetailDataType, fetchDetailAPI } from "@/apis/detail";
import { useEffect, useState } from "react";

type Props = {
    id: string
}

export function useDetail(props: Props) {
    const { id } = props
    const [detail, setDetail] = useState<DetailDataType | null>(null)
    useEffect(() => {
        async function getDetail(id: string) {
            try {
                const res = await fetchDetailAPI(id)
                setDetail(res.data.data)
            } catch(error) {
                throw new Error("fetchDetailAPI error!")
            }
        }
        getDetail(id)
    }, [id])

    return {
        detail
    }
}