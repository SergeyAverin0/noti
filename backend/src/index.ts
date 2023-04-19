import app from './app'
import connectToMongoDB from './models/connectToMongoDB'
import notiConfig from './conf/noti.config'

// Start server
const start = async () => {
  connectToMongoDB()
  app.listen(notiConfig.BACKEND_PORT, () => {
    console.log(
      `[server]: Server is running at http://${notiConfig.BACKEND_HOST}:${notiConfig.BACKEND_PORT}`,
    )
  })
}

start()
