
export function getMapasPublicos (userID) { //Con este servicio obtendremos un solo coctail a partir de su id.

  const apiURL = 'http://127.0.0.1:8000/api/mapas/publicos';
  console.log(apiURL)
  //Usamos la ID pasada por parámetro.
  console.log(localStorage.getItem('userData'))
  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Authorization': JSON.parse(localStorage.getItem("userData")).content.token_type+" "+JSON.parse(localStorage.getItem("userData")).content.access_token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const data = response.json();
      console.log(data)
      return data;
  })
}