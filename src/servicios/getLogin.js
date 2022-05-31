
export function getLogin (email, password) {

  const apiURL = process.env.REACT_APP_BACKEND_URL+'/api/login';

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