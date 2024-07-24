import { request } from "../utils"

export function getChannelsAPI() {
    return request({
        url: "/channels",
        method: "GET"
    })
}

export function createArticleAPI(data: any) {
    return request({
        url: "/mp/articles?draft=false",
        method: "POST",
        data
    })
}