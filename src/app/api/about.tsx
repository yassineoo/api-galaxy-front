import React, { use, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const defaultText = `<div>
<h1>Google Translation API Documentation</h1>
<p>This document provides an overview of the Google Translation API, including how to make requests, handle responses, and understand error codes.</p>

<h2>Introduction</h2>
<p>The Google Translation API allows developers to programmatically translate text between thousands of language pairs.</p>

<h2>Authentication</h2>
<p>To use the Google Translation API, you must have an API key. Include this key in the request header for authentication.</p>
<code>
    'Authorization: Bearer YOUR_API_KEY'
</code>

<h2>Basic Usage</h2>
<p>To translate text, make a POST request to the following endpoint:</p>
<code>
    POST https://translation.googleapis.com/language/translate/v2
</code>
<p>Include the following parameters in your request body:</p>
<ul>
    <li><strong>q</strong>: The text to translate.</li>
    <li><strong>target</strong>: The language you want to translate the text into.</li>
    <li><strong>source</strong>: The language of the original text (optional).</li>
</ul>

<h3>Example Request</h3>
<pre>
&lt;code&gt;
{
"q": "Hello, world!",
"target": "es",
"source": "en"
}
&lt;/code&gt;
</pre>

<h2>Error Handling</h2>
<p>The API uses standard HTTP status codes to indicate the success or failure of an API request. For example, a 200 OK status code means the request was successful.</p>

<h2>Rate Limits and Pricing</h2>
<p>Be aware of the rate limits and pricing structure for the use of the Google Translation API. Exceeding rate limits can result in additional charges or temporary suspension of service.</p>

<h2>More Information</h2>
<p>For more detailed information, please refer to the <a href='https://cloud.google.com/translate/docs'>official Google Translation API documentation</a>.</p>
</div>
`;

const About = () => {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    console.log(text);
  }, [text]);
  const modules = {
    toolbar: false,
  };

  return (
    <div>
      <QuillNoSSRWrapper
        modules={modules}
        theme="snow"
        value={defaultText}
        onChange={setText}
        readOnly
      />
    </div>
  );
  // return <ReactQuill theme="snow" value={text} onChange={setText} />;
};

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default About;
