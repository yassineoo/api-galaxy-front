import { Endpoint } from "./endpoints.interface"

interface Collection { }
interface ApiVersion { }
interface ApiRating { }
interface Plan { }
interface ObjectPlan { }
interface Group { }
interface ApiDoc {
    ID: number,
    ApiID: number,
    Content: string,
    LastUpdated: string
}

interface HealthCheck {
    ID: number,
    ApiID: number,
    LastStatus: string,
    LastCheckedAt: string,
    AlertsEnabled: boolean,
    EndpointID: number,
    Endpoint: Endpoint,
    Email: string,
    Results: null,
    Category: {
        ID: number,
        CategoryName: string,
        Description: string,
        Apis: Api[] | null
    }
}

export interface Api {
    ID: number,
    ProviderID: number,
    Name: string,
    ImagePath: string,
    Description: string,
    Keywords: string,
    Visibility: boolean,
    ApiUrl: string,
    CategoryID: number,
    Collections: Collection[] | null,
    Status: "inactive" | "active",
    DateCreated: string,
    LastUpdated: string,
    DateDeleted: string,
    ApiVersions: ApiVersion[] | null,
    ApiRatings: ApiRating[] | null,
    Plans: Plan[] | null,
    ObjectPlan: ObjectPlan | null,
    Groups: Group[] | null,
    ApiDocs: ApiDoc,
    HealthCheck: HealthCheck
}
