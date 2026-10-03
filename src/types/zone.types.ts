export interface IAddZonePayload {
    zoneImage: File;
    data: {
        name: string;
        code: string;
        description: string;

    }
}

export interface IZoneQueryParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}






export interface Substation {
    id: string;
    name: string;
    capacity: string;
    code: string;
    location: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    zoneId: string;
}

export interface Zone {
    id: string;
    name: string;
    code: string;
    description: string;
    status: string;
    zoneImageUrl: string;
    zoneImagePublicId: string;
    createdAt: string;
    updatedAt: string;
    substations: Substation[];
}