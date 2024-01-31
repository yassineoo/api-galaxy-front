// interfaces.ts

export interface ApiEndpointsCreation {
  Name: string;
  Methode: string;
  Url: string;
  Description: string;
}

export interface ApiEndpoints {
  id: string;
  Methode: string;
  Url: string;
  Description: string;
  // Add other properties as needed
}
