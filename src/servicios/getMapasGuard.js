
export function getMapasGuard () {

  const apiURL = process.env.REACT_APP_BACKEND_URL+'/api/mapas-guardados';

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