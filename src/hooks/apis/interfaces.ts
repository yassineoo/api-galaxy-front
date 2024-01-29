// interfaces.ts

export interface Api {
  id: string;
  name: string;
  apiUrl: string;
  // Add other properties as needed
}

export interface ApiInput {
  name: string;
  apiUrl: string;
  // Add other input properties for creating/updating
}
