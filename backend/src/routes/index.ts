import express, { Router } from 'express'

import noteRoute from './notes.routes'

const routes: Router = express.Router()
routes.use('/notes', noteRoute)

export default routes
