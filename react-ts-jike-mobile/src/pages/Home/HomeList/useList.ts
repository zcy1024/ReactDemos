import { fetchListAPI, ListRes } from "@/apis/list";
import { useEffect, useState } from "react";

export type Props = {
    channel_id: string
}

export function useList(props: Props) {
    const { channel_id } = props
    const [listRes, setListRes] = useState<ListRes>({
        results: [],
        pre_timestamp: '' + new Date().getTime()
    })
    useEffect(() => {
        async function getList() {
            try {
                const res = await fetchListAPI({
                    channel_id,
                    timestamp: '' + new Date().getTime()
                })
                setListRes(res.data.data)
            } catch (error) {
                throw new Error("fetchListAPI error!")
            }
        }
        getList()
    }, [])

    const [hasMore, setHasMore] = useState<boolean>(true)
    const loadMore = async () => {
        // console.log("loading...")

        try {
            const res = await fetchListAPI({
                channel_id,
                timestamp: listRes.pre_timestamp
            })
            setListRes({
                results: [...listRes.results, ...res.data.data.results],
                pre_timestamp: res.data.data.pre_timestamp
            })
            setHasMore(res.data.data.results.length !== 0)
        } catch (error) {
            throw new Error("fetchListAPI error!")
        }
    }

    return {
        listRes,
        hasMore,
        loadMore
    }
}