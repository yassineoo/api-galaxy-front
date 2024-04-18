// interfaces.ts

export interface ApiCreation {
  Name: string;
  ProviderID: number;
  ApiUrl: string;
  CategoryID: number;
  ImagePath: string;
  Keywords: string;
  Description: string;
}

export interface Api {
  ID: number;
  Name: string;
  ProviderID: number;
  ApiUrl: string;
  CategoryID: number;
  ImagePath: string;
  Keywords: string;
  Description: string;
  // Add other properties as needed

  HealthCheckEndpointId: number;
  EmailNotifcation: string;
}

export interface ApiInput {
  name: string;
  apiUrl: string;
  // Add other input properties for creating/updating
}
