import { request } from "./common";

export function findByName(name) {
    return request({
        url: '/person/findByName',
        method: "get",
        params: {
            'name': name
        }
    })
}

export function findAllPerson() {
    return request({
        url: '/person/findAllPerson',
        method: "get",
    })
}

export function findByTitle(title) {
    return request({
        url: '/movie/findByTitle',
        method: "get",
        params: {
            'title': title
        }
    })
}

export function findAllMovie() {
    return request({
        url: '/movie/findAllMovie',
        method: "get",
    })
}

export function findAllNodes() {
    return request({
        url: '/node/findAllNodes',
        method: "get",
    })
}

export function findAllLinks() {
    return request({
        url: '/link/findAllLinks',
        method: "get",
    })
}

export function findActedBy(name) {
    return request({
        url: '/custom/actedBy',
        method: "get",
        params: {
            'name': name
        }
    })
}