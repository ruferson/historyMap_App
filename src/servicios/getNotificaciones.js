
export function getNotificaciones (usuarioID) { 

    const apiURL = `http://historymap.es/api/noti/${usuarioID}`;
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