export interface ILoadSheddingPayload {
  title: string;
  startTime: string;
  endTime: string;
  reason?: string;
  areaId: string;
}

export interface ILoadSheddingQuery {
    page?:number;
    limit?:number;
    searchTerm?:string;
}
export interface IUpdateLoadSheddingPayload {
    id:string;
    title?:string;
    areaId?:string
}

export type Area = {
  id: string;
  name: string;
  code: string;
  address: string;
  status: string;
  feederId: string;
  createdAt: string;
  updatedAt: string;
};

export type LoadSheddingSchedule = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
  reason: string;
  areaId: string;
  createdAt: string;
  updatedAt: string;
  area: Area;
};
