// export const getAllData = params => {
//   return fetch('http://123.207.19.172:8080/api/all').then(response => response.json()).then(function (myJson) {
//     console.log(myJson)
//   })
// }
export const getAllData = () => {
  return fetch('http://123.207.19.172:8080/api/all')
}
