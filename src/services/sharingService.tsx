import axios from "axios";

const api = "http://localhost:8787/api";
//const api = "https://journal-backend.haskwell.workers.dev/api";

export async function sharePage(pageNumber: number, username: string){
    const res = await axios.post(
        `${api}/auth/share/${pageNumber}`,
        {
            sharedToUsername: username
        },
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function getSharedPages(startList: number, endList: number){
    const res = await axios.get(
        `${api}/auth/shared?start=${startList}&end=${endList}`,
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function getSharedPagesISent(startList: number, endList: number){
    const res = await axios.get(
        `${api}/auth/shared/sent?start=${startList}&end=${endList}`,
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function getSharedPageById(pageId: string | undefined){
    if(!pageId) return false
    const res = await axios.get(
        `${api}/auth/shared/get/${pageId}`,
        {
            withCredentials: true
        }
    )
    return res.data.data;
}

export async function deleteShare(pageId: string){
    const res = await axios.delete(
        `${api}/auth/shared/delete/${pageId}`,
        {
            withCredentials: true
        }
    )
    return res.data
}