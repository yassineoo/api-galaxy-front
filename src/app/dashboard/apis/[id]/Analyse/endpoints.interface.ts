import { Group } from "next/dist/shared/lib/router/utils/route-regex"

export type HTTP_METHOD = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
export type ValueType = "string" | "number"
export type ParameterType = "PathParmater" | "QueryParmater" | "BodyParmater" | "HeaderParmater"

interface Endpoint_Parameter {
    ID: number,
    EndpointID: number,
    Key: string,
    ValueType: ValueType,
    ParameterType: ParameterType,
    ExampleValue: string,
    Required: boolean
}

export interface Endpoint_BodyParam { ID: number, EndpointID: number, ContentType: string, TextBody: string }

export interface Endpoint_Group {
    ID: number,
    ApiID: number,
    Group: string,
    Description: string,
    Endpoints: Endpoint[] | null
}

export interface Endpoint {
    ID: number,
    GroupID: number,
    Methode: HTTP_METHOD,
    Name: string,
    Url: string,
    Description: string,
    Group: Endpoint_Group,
    Parameters: Endpoint_Parameter[] | null,
    BodyParam: Endpoint_BodyParam,
    Logs: null,
    HealthCheck: null
}
// const endpoints: Endpoint[] =
//     [
//         {
//             ID: 15,
//             GroupID: 3,
//             Methode: 'GET',
//             Name: 'todos list',
//             Url: 'todos',
//             Description: 'todos lsit',
//             Group: {
//                 ID: 3,
//                 ApiID: 3,
//                 Group: 'Default',
//                 Description: '',
//                 Endpoints: null
//             },
//             Parameters: [],
//             BodyParam: { ID: 0, EndpointID: 0, ContentType: '', TextBody: '' },
//             Logs: null,
//             HealthCheck: null
//         },
//         {
//             ID: 10,
//             GroupID: 2,
//             Methode: 'GET',
//             Name: 'getUsers',
//             Url: 'getUsers/{id}/math',
//             Description: 'getUsers from the de^pp',
//             Group: {
//                 ID: 2,
//                 ApiID: 3,
//                 Group: 'users',
//                 Description: 'hihi',
//                 Endpoints: null
//             },
//             Parameters: [],
//             BodyParam: { ID: 0, EndpointID: 0, ContentType: '', TextBody: '' },
//             Logs: null,
//             HealthCheck: null
//         },
//         {
//             ID: 13,
//             GroupID: 5,
//             Methode: 'GET',
//             Name: 'getAdmins',
//             Url: 'getUsers/{id}/math',
//             Description: 'getUsers from the de^pp',
//             Group: {
//                 ID: 5,
//                 ApiID: 3,
//                 Group: 'kokokoss',
//                 Description: 'hihiiiss',
//                 Endpoints: null
//             },
//             Parameters: [
//                 {
//                     ID: 1,
//                     EndpointID: 13,
//                     Key: 'id',
//                     ValueType: 'string',
//                     ParameterType: 'PathParmater',
//                     ExampleValue: '',
//                     Required: true
//                 },
//                 {
//                     ID: 2,
//                     EndpointID: 13,
//                     Key: 'jojo',
//                     ValueType: 'string',
//                     ParameterType: 'QueryParmater',
//                     ExampleValue: 'jojo',
//                     Required: false
//                 },
//                 {
//                     ID: 3,
//                     EndpointID: 13,
//                     Key: 'fofo',
//                     ValueType: 'string',
//                     ParameterType: 'BodyParmater',
//                     ExampleValue: '',
//                     Required: false
//                 },
//                 {
//                     ID: 4,
//                     EndpointID: 13,
//                     Key: 'auth',
//                     ValueType: 'string',
//                     ParameterType: 'HeaderParmater',
//                     ExampleValue: 'momo',
//                     Required: false
//                 },
//                 {
//                     ID: 5,
//                     EndpointID: 13,
//                     Key: 'lolo',
//                     ValueType: 'string',
//                     ParameterType: 'BodyParmater',
//                     ExampleValue: '',
//                     Required: false
//                 }
//             ],
//             BodyParam: { ID: 0, EndpointID: 0, ContentType: '', TextBody: '' },
//             Logs: null,
//             HealthCheck: null
//         },
//         {
//             ID: 14,
//             GroupID: 3,
//             Methode: 'PUT',
//             Name: 'getClients',
//             Url: 'getUsers/{id}/mathhhEdit',
//             Description: 'getUsers from the depooo Edit',
//             Group: {
//                 ID: 3,
//                 ApiID: 3,
//                 Group: 'Default',
//                 Description: '',
//                 Endpoints: null
//             },
//             Parameters: [
//                 {
//                     ID: 6,
//                     EndpointID: 14,
//                     Key: 'id',
//                     ValueType: 'string',
//                     ParameterType: 'PathParmater',
//                     ExampleValue: '',
//                     Required: true
//                 },
//                 {
//                     ID: 7,
//                     EndpointID: 14,
//                     Key: 'jojo',
//                     ValueType: 'string',
//                     ParameterType: 'QueryParmater',
//                     ExampleValue: 'jojo',
//                     Required: false
//                 },
//                 {
//                     ID: 8,
//                     EndpointID: 14,
//                     Key: 'fofo',
//                     ValueType: 'string',
//                     ParameterType: 'BodyParmater',
//                     ExampleValue: '',
//                     Required: false
//                 },
//                 {
//                     ID: 9,
//                     EndpointID: 14,
//                     Key: 'auth',
//                     ValueType: 'string',
//                     ParameterType: 'HeaderParmater',
//                     ExampleValue: 'momo',
//                     Required: false
//                 },
//                 {
//                     ID: 10,
//                     EndpointID: 14,
//                     Key: 'lolo',
//                     ValueType: 'string',
//                     ParameterType: 'BodyParmater',
//                     ExampleValue: '',
//                     Required: false
//                 }
//             ],
//             BodyParam: { ID: 0, EndpointID: 0, ContentType: '', TextBody: '' },
//             Logs: null,
//             HealthCheck: null
//         }
//     ]
