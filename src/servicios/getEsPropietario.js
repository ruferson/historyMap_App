
export function getEsPropietario (usuarioID, mapaID) { 

  const apiURL = `http://historymap.es/api/esprop/${usuarioID}&${mapaID}`;

  return fetch(apiURL, {
    method: 'GET',
  })
    .then(response => {
      const data = response.json();
      return data;
  })
}