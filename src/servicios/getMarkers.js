
export function getMarkers (mapa) { //Con este servicio obtendremos un solo coctail a partir de su id.

  const apiURL = `http://historymap.es/api/records/marcadores`;
  console.log(apiURL)
  //Usamos la ID pasada por parámetro.

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 4|qPEXqsDDA76ZTci3zNg7EiXwPmvDXqWvVwl5fEvz',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const data = response.json();
      console.log(data)
      return data;
  })
}