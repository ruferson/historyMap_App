
export function getLogin (email, password) { //Con este servicio obtendremos un solo coctail a partir de su id.

  const apiURL = 'http://127.0.0.1:8000/api/login';
  console.log(apiURL)
  //Usamos la ID pasada por parámetro.

  console.log(email+" "+password)

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
      console.log(data)
      return data;
  })
}