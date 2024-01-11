export default function fetchService(url, jwt, requestMethod, requestBody) {
  const requestOptions = {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (jwt) {
    requestOptions.headers.Authorization = `Bearer ${jwt}`;
  }

  if (requestBody) {
    requestOptions.body = JSON.stringify(requestBody);
  }
  return fetch(url, requestOptions).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then((text) => {
        // If it's not valid JSON, throw the text directly
        throw new Error(text);
      });
    }
  });
}
