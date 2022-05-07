
export function getEsPropietario (usuarioID, mapaID) { 

  const apiURL = `http://historymap.es/api/esprop/${usuarioID}&${mapaID}`;
  console.log(apiURL)
  //Usamos la ID pasada por parámetro.

  return fetch(apiURL, {
    method: 'GET',
  })
    .then(response => {
      const data = response.json();
      console.log(data)
      return data;
  })
}