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

export function getArticleListAPI(params: any) {
    return request({
        url: "/mp/articles",
        method: "GET",
        params
    })
}

export function deleteArticleAPI(id: string) {
    return request({
        url: `/mp/articles/${id}`,
        method: "DELETE"
    })
}

export function getArticleByIdAPI(id: string) {
    return request({
        url: `/mp/articles/${id}`,
        method: "GET"
    })
}

export function updateArticleAPI(id: string, data: any) {
    return request({
        url: `/mp/articles/${id}?draft=false`,
        method: "PUT",
        data
    })
}