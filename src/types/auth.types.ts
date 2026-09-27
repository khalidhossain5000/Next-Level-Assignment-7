export interface ILoginPayload{
    email:string;
    password:string;
}



export const USER_ROLES=["CUSTOMER","TECHNICIAN","ADMIN"] as const

export type TUserRole="CUSTOMER" | "TECHNICIAN" | "ADMIN" 

export type UserStatus = "BAN" | "ACTIVE" ;

export interface IUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
  status: UserStatus;
  createdAt: string;
  reportedOutages?: { id: string }[];
  payments?: { id: string; status: string }[];
}

export interface IUpdateUserStatus {
    userId:string;
    status:"BAN" | "ACTIVE"
}


export interface IRegisterPayload {
    name:string;
    email:string;
    password:string;
}


export interface IVerifyEmailPayload{
    email:string;
    otp:string;
}

export enum TechnicianProfileStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface ITechnicanPayload{
    technicianId:string;
    status:TechnicianProfileStatus
}