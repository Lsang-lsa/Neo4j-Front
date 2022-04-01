import { request } from "./common";

export function findAllActor() {
    return request({
        url: '/actor/findAllActor',
        method: "get",
    })
}

export function findRelatedActor(params) {
    return request({
        url: '/actor/findRelatedActor',
        method: "get",
        params: {
            ...params
        }
    })
}
