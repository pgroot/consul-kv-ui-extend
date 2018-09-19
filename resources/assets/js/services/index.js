import {createHttpClient} from './http'

const client = new createHttpClient()


export function getAllDcs() {
    return client.get()
}
