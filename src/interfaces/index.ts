type Cors = 'yes' | 'no' | 'unknown';

export interface ApiData {
    API: string;
    Auth: string;
    Category: string;
    Cors: Cors;
    Description: string;
    HTTPS: boolean;
    Link: string;
}

export interface DataResponse {
    count: number;
    entries: ApiData[];
}
