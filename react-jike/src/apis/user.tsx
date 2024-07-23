import { request } from "../utils"

export function loginAPI(formData: any) {
    return request({
        url: "/authorizations",
        method: "POST",
        data: formData
    })
}

export function getProfileAPI() {
    return request({
        url: "/user/profile",
        method: "GET"
    })
}