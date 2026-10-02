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
