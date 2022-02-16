const apiConfig = {
  baseUrl : 'https://api.themoviedb.org/3/',
  apiKey : '97a79da47e8446bef3226a7a531dd791',
  originalImage : (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}` ,
  w500Image : (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig ;