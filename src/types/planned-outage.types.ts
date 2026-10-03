import { Area } from "./load-shedding.types";

export interface IPlannedOutagePayload {
  title: string;
  reason: string;
  description: string;
  startTime: string;
  endTime: string;
  areaId: string;
}


export interface IUpdatePayload {
  id:string;
    title?:string;
    description?:string;
    reason?:string
}



    






export interface IPlannedOutage {
  id:string;
  title:string;
  reason:string;
  description:string;
  status:string;
  startTime:string;
  endTime:string;
  areaId:string;
  createdAt:string;
  updatedAt:string;
  area:Area
}