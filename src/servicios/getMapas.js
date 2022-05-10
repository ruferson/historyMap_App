
export function getMapas (userID) { //Con este servicio obtendremos un solo coctail a partir de su id.

  const apiURL = 'http://127.0.0.1:8000/api/mapas';
  console.log(apiURL)
  //Usamos la ID pasada por parámetro.

  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer 1|cCGFN1UPcPQTWtCXk7Di9hQi428u30QirHEyzb8A',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const data = response.json();
      console.log(data)
      return data;
  })
}