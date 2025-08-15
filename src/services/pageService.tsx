import axios from "axios";
import type { UpdatePageRequest } from "../types/page";

//const api = "http://localhost:8787/api";
const api = "https://journal-backend.haskwell.workers.dev/api";

export async function newPage(){
    const res = await axios.post(
        `${api}/auth/page/new`,
        {

        },
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function getPages(startList: number = 1, endlist: number = 50){
    const res = await axios.get(
        `${api}/auth/page?start=${startList}&end=${endlist}`,
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function getPagesByNumber(pageNumber: number = 0){
    const res = await axios.get(
        `${api}/auth/page/${pageNumber}`,
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function updatePage(updateRequest: UpdatePageRequest){
    const res = await axios.put(
        `${api}/auth/page/update`,
        updateRequest,
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function deletePage(pageNumber: number){
    const res = await axios.delete(
        `${api}/auth/page/delete/${pageNumber}`,
        {
            withCredentials: true
        }
    )
    return res.data;
}