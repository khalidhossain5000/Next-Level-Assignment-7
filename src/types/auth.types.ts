export interface ILoginPayload{
    email:string;
    password:string;
}



export const USER_ROLES=["CUSTOMER","TECHNICIAN","ADMIN"] as const

export type TUserRole="CUSTOMER" | "TECHNICIAN" | "ADMIN" 


export interface IRegisterPayload {
    name:string;
    email:string;
    password:string;
}


export interface IVerifyEmailPayload{
    email:string;
    otp:string;
}

enum TechnicianProfileStatus {
  PENDING,
  APPROVED,
  REJECTED
}

export interface ITechnicanPayload{
    technicianId:string;
    status:TechnicianProfileStatus
}