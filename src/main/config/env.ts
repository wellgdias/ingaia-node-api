import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
  weatherApi: {
    Url: 'https://api.openweathermap.org/data/2.5',
    Key: process.env.WEATHER_APIKEY
  },
  spotifyApi: {
    clientId: process.env.SPOTIFY_CLIENTID,
    clientSecret: process.env.SPOTIFY_CLIENTSECRET
  }
}
