
export function getLogin (email, password) {

  const apiURL = 'http://127.0.0.1:8000/api/login';

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
  })
    .then(response => {
      const data = response.json();
      return data;
  })
}