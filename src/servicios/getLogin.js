
export function getLogin (email, password) { //Con este servicio obtendremos un solo coctail a partir de su id.

  const apiURL = 'http://127.0.0.1:8000/api/login';
  console.log(apiURL)
  //Usamos la ID pasada por parámetro.

  return fetch(apiURL, {
    method: 'POST',
    data: {
      email: email,
      password: password,
    },
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  })
    .then(response => {
      const data = response.json();
      console.log(data)
      return data;
  })
}