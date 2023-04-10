import "../styles/styles.scss"

fetch('https://fakestoreapi.com/products')
  .then(function (response) {
    return response.json()
  })
  .catch(function (error) {
    console.log('error', error)
  })
  .then(function (data) {
    console.log('data', data)
  })