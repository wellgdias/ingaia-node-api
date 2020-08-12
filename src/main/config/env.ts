export default {
  mongoUrl:
    process.env.MONGO_URL || 'mongodb://localhost:27017/ingaia-node-api',
  port: process.env.PORT || 3030
}
