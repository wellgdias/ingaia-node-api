export default {
  mongoUrl:
    process.env.MONGO_URL || 'mongodb://localhost:27017/ingaia-node-api',
  port: process.env.PORT || 3030,
  weatherApi: {
    Url: 'https://api.openweathermap.org/data/2.5',
    Key: process.env.WEATHER_APIKEY || 'fd08c6e43db7dfc8c6d9141d71b996e3'
  },
  spotifyApi: {
    clientId:
      process.env.SPOTIFY_CLIENTID || '732dcbf2ac1e484faa265d5a8947cd54',
    clientSecret:
      process.env.SPOTIFY_CLIENTSECRET || '922e83887a3b46b5bc3e37140b3c01b8',
    accessToken:
      process.env.SPOTIFY_ACCESSTOKEN ||
      'BQA792IoOLYfPZx5TJlVRxJreaEdOipR1GR8-To49Ym9uiC607fnsE7R7toxlUzsoim7scbks3Ga7LJqOTnb5qFfVSj8HDNpaP4xmDvahGmHuq1kcnkdZStPF6X6tlRfoY3f6TvU3-aFqmOEAk7OUBPXlROjf8F3Lrk7xW6_7WY'
  }
}
