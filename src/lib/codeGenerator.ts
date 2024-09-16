export function generateAxiosSnippet(
  endpointUrl: string,
  method: string,
  headers: Record<string, string> = {},
  body: Record<string, any> = {},
  query: Record<string, string> = {}
): string {
  // Convert query object to query string
  const queryString = new URLSearchParams(query).toString();

  // Add query string to endpoint URL
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;

  // Generate headers string
  const headersString = JSON.stringify(headers, null, 2);

  // Generate body string if not a GET request
  const bodyString =
    method.toUpperCase() !== "GET"
      ? `\n    data: ${JSON.stringify(body, null, 2)},`
      : "";

  // Template for the Axios request
  return `
import axios from 'axios';

async function makeRequest() {
  try {
    const response = await axios({
      method: '${method.toLowerCase()}',
      url: '${urlWithQuery}',
      headers: ${headersString},${bodyString}
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
}

// Usage
makeRequest().catch(error => {
  console.error('Error in makeRequest:', error);
});
`;
}

export function generatePhpCurlSnippet(
  endpointUrl: string,
  method: string,
  headers: Record<string, string> = {},
  body: Record<string, any> = {},
  query: Record<string, any> = {}
): string {
  // Convert query object to query string
  const queryString = new URLSearchParams(query).toString();
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;

  // Format headers for PHP
  const headersArray = Object.entries(headers).map(
    ([key, value]) => `"${key}: ${value}"`
  );
  const headersString = headersArray.join(",\n    ");

  // Format body for PHP
  const bodyString = new URLSearchParams(body)
    .toString()
    .replace(/&/g, '",\n    "');

  // Start building the PHP cURL snippet
  let snippet = `
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "${urlWithQuery}",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => '${method.toUpperCase()}',\n`;

  // Add headers and body if applicable
  if (Object.keys(headers).length > 0) {
    snippet += `    CURLOPT_HTTPHEADER => [\n    ${headersString}\n    ],\n`;
  }
  if (["POST", "PUT"].includes(method.toUpperCase())) {
    snippet += `    CURLOPT_POSTFIELDS => "${bodyString}"\n`;
  }

  // End of the cURL snippet
  snippet += `]);

$response = curl_exec($curl);

curl_close($curl);
echo $response;
`;

  return snippet;
}

export function generatePythonRequestsSnippet(
  endpointUrl: string,
  method: string,
  headers: Record<string, string> = {},
  body: Record<string, any> = {},
  query: Record<string, any> = {}
): string {
  // Convert query object to query string
  const queryString = new URLSearchParams(query).toString();
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;

  // Format headers for Python
  const headersString = JSON.stringify(headers, null, 4);

  // Format body for Python
  const bodyString = JSON.stringify(body, null, 4);

  // Build the Python requests snippet
  let snippet = `
import requests
import json

url = "${urlWithQuery}"
headers = ${headersString}
`;

  if (["GET", "DELETE"].includes(method.toUpperCase())) {
    snippet += `
response = requests.${method.toLowerCase()}(url, headers=headers)
`;
  } else {
    // POST, PUT, PATCH
    snippet += `
payload = ${bodyString}
response = requests.${method.toLowerCase()}(url, headers=headers, data=json.dumps(payload))
`;
  }

  snippet += `
print(response.text)
`;

  return snippet;
}

export function generateJavaSnippet(
  endpointUrl: string,
  headers: Record<string, string>,
  body: Record<string, any>,
  query: Record<string, any>
): string {
  const bodyString = new URLSearchParams(body).toString();
  const queryString = new URLSearchParams(query).toString();
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;

  // Java doesn't have a built-in method to convert a map to a string directly,
  // so we manually format it.
  const headersString = Object.entries(headers)
    .map(([key, value]) => `requestBuilder.header("${key}", "${value}");`)
    .join("\n        ");

  return `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
            .uri(URI.create("${urlWithQuery}"))
            .POST(HttpRequest.BodyPublishers.ofString("${bodyString}"));
        ${headersString}

        HttpRequest request = requestBuilder.build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}
`;
}

export function generateCSharpSnippet(
  endpointUrl: string,
  headers: Record<string, string>,
  body: Record<string, any>,
  query: Record<string, any>
): string {
  const bodyString = JSON.stringify(body);
  const queryString = new URLSearchParams(query).toString();
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;

  const headersString = Object.entries(headers)
    .map(([key, value]) => `request.Headers.Add("${key}", "${value}");`)
    .join("\n        ");

  return `
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;

class Program {
    static async Task Main() {
        using (HttpClient client = new HttpClient())
        {
            using (HttpRequestMessage request = new HttpRequestMessage())
            {
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri("${urlWithQuery}");
                request.Content = new StringContent("${bodyString}", Encoding.UTF8, "application/json");
                ${headersString}

                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseBody);
                }
            }
        }
    }
}
`;
}

export function generateJavaScriptBrowserSnippet(
  endpointUrl: string,
  headers: Record<string, string>,
  body: Record<string, any>,
  query: Record<string, any>
): string {
  // Convert the body and query objects to JSON and query string respectively
  const bodyString = JSON.stringify(body);
  const queryString = new URLSearchParams(query).toString();
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;

  // Format headers for JavaScript
  const headersString = JSON.stringify(headers, null, 2);

  return `
const url = "${urlWithQuery}";
const headers = ${headersString};
const body = ${bodyString};

fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`;
}

export function generateKotlinSnippet(
  endpointUrl: string,
  headers: Record<string, string>,
  body: Record<string, any>,
  query: Record<string, any>
): string {
  const queryString = new URLSearchParams(query).toString();
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;
  const bodyString = JSON.stringify(body);

  const headersString = Object.entries(headers)
    .map(
      ([key, value]) => 'connection.setRequestProperty("${key}", "${value}")'
    )
    .join(";\n    ");

  return `
import java.net.HttpURLConnection
import java.net.URL
import java.util.*

fun main() {
    val url = URL("${urlWithQuery}")
    with(url.openConnection() as HttpURLConnection) {
        requestMethod = "POST"
        doOutput = true
        ${headersString}
        
        outputStream.bufferedWriter().use {
            it.write("${bodyString}")
        }

        inputStream.bufferedReader().use {
            it.lines().forEach { line ->
                println(line)
            }
        }
    }
}
`;
}

export function generateSwiftSnippet(
  endpointUrl: string,
  headers: Record<string, string>,
  body: Record<string, any>,
  query: Record<string, any>
): string {
  const queryString = new URLSearchParams(query).toString();
  const urlWithQuery = queryString
    ? `${endpointUrl}?${queryString}`
    : endpointUrl;
  const bodyString = JSON.stringify(body);

  const headersString = Object.entries(headers)
    .map(
      ([key, value]) =>
        'request.setValue("(value)", forHTTPHeaderField: "(key)")'
    )
    .join("\n    ");

  return `
import Foundation

if let url = URL(string: "${urlWithQuery}") {
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    ${headersString}
    request.httpBody = Data("${bodyString}".utf8)

    URLSession.shared.dataTask(with: request) { data, response, error in
        guard let data = data, error == nil else {
            print("Error: \\(error?.localizedDescription ?? "No data")")
            return
        }
        let responseString = String(data: data, encoding: .utf8)
        print("Response String: \\(responseString ?? "Invalid response")")
    }.resume()
}
`;
}
