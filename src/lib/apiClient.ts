import { ofetch } from "ofetch"

const baseURL=process.env.NEXT_PUBLIC_BASE_URL

const apiClient=ofetch.create({
    baseURL,
    credentials:"include",
   
    async onResponseError({ response,options }) {
        if (response.status === 401) {
            console.log("401 detected");
            await ofetch("/auth/refresh-token",{
                baseURL,
                method:"POST",
                credentials:"include"
            })
            options.retry = 1;
            options.retryStatusCodes = [401];
        }
    },

 
})


export default apiClient