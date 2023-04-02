import app from './app'
import connectToMongoDB from './models/connectToMongoDB'
import notiConfig from './conf/noti.config'

// Start server
const start = async () => {
  try {
    connectToMongoDB()
    app.listen(notiConfig.BACKEND_PORT, () => {
      console.log(
        `[server]: Server is running at http://${notiConfig.BACKEND_HOST}:${notiConfig.BACKEND_PORT}`,
      )
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
