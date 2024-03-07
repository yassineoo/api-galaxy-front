// interfaces.ts

export interface CollectionCreation {
  ApiId: string;
  Name: string;
  Image: string;

  Description: string;
}

export interface Collection {
  ID: string;
  Name: string;
  Image: string;
  Description: string;
  // Add other properties as needed
}
