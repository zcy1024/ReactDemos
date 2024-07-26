import { useState, useEffect } from "react"
import { fetchChannelAPI, type ChannelItem } from "@/apis/list"

export function useTabs() {
    const [channels, setChannels] = useState<ChannelItem[]>([])
    useEffect(() => {
        async function getChannels() {
            try {
                const res = await fetchChannelAPI()
                setChannels(res.data.data.channels)
            } catch (error) {
                throw new Error("fetchChannelAPI error!")
            }
        }
        getChannels()
    }, [])

    return {
        channels
    }
}