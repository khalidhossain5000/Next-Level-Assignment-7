export interface ILoginPayload{
    email:string;
    password:string;
}



export const USER_ROLES=["CUSTOMER","TECHNICIAN","ADMIN"] as const

export type TUserRole="CUSTOMER" | "TECHNICIAN" | "ADMIN" 