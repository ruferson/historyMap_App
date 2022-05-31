
export function getUsers () {

  const apiURL = process.env.REACT_APP_BACKEND_URL+'/api/users';
  
  let token;
  if (localStorage.getItem('userToken') !== null){
    token = JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token
  } else {
    token = ""
  }
  
  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const data = response.json();
      return data;
  })
}