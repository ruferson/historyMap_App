
export function getMapasGuard () { //Con este servicio obtendremos un solo coctail a partir de su id.

  const apiURL = 'http://127.0.0.1:8000/api/mapas-guardados';
  //Usamos la ID pasada por parámetro.

  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const data = response.json();
      console.log(data)
      return data;
  })
}