
export function getMapasGuard () {

  const apiURL = 'http://127.0.0.1:8000/api/mapas-guardados';

  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const data = response.json();
      return data;
  })
}