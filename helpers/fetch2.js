import { store } from "../App"
const url = 'https://todo-reduxtoolkitapp2.vercel.app';

const storeData = store.getState()
export const fetch2 = async (api, body) => {
    const res = await fetch(url + api, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": storeData.user.token,
        },
        body: JSON.stringify(body)
    })
    var newRes = await res.json();
    return newRes
}


export const fetch3 = async (api, type) => {
    const res = await fetch(url + api, {
        method: type,
        headers: {
            "Content-Type": "application/json",
            "Authorization": storeData.user.token
        }
    })

    var newRes = await res.json();
    return newRes
}







