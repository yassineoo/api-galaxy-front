import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeResult } from "../api/apiBody";
import CodeSnippet from "../api/codeSnippet";
import ApiDocsGraph from "../api/apiDoc";

const codeString = `
const axios = require('axios');

axios.get('https://yourapi.com/endpoint')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
`;

const result = `{
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": {
      "street": "123 Fake Street",
      "city": "Faketown",
      "country": "Fakeland"
    }
  }
}
`;
export default function Testpage() {
  return (
    <div className="h-screen">
      <ApiDocsGraph />
    </div>
  );
}
