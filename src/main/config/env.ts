export default {
  mongoUrl:
    process.env.MONGO_URL || 'mongodb://localhost:27017/ingaia-node-api',
  port: process.env.PORT || 3030,
  weatherApi: {
    Url: 'https://api.openweathermap.org/data/2.5',
    Key: process.env.WEATHER_APIKEY
  },
  spotifyApi: {
    clientId: process.env.SPOTIFY_CLIENTID,
    clientSecret: process.env.SPOTIFY_CLIENTSECRET
  }
}
