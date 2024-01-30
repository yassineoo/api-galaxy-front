// interfaces.ts

export interface ApiCategoryCreation {
  Name: string;
  Description: string;
}

export interface Category {
  id: string;
  Name: string;
  Description: string;
  // Add other properties as needed
}

export interface ApiInput {
  name: string;
  apiUrl: string;
  // Add other input properties for creating/updating
}
