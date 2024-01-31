// interfaces.ts

export interface EndpointsGroupCreation {
  ApiId: string;
  Group: string;
  Description: string;
}

export interface EndpointsGroup {
  id: string;
  Group: string;
  Description: string;
  // Add other properties as needed
}
