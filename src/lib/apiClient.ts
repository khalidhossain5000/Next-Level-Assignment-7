import { ofetch } from "ofetch"

const baseURL=process.env.NEXT_PUBLIC_BASE_URL



const apiClient=ofetch.create({
    baseURL,
    credentials:"include"
})


export default apiClient