import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { HttpExceptionTransformer } from 'http-exception-transformer'
// import { initializeMongoDB } from './services/database/mongoose'
import { initializeDatasets } from './services/excel/reader'

/** link all modules onto application */
import ResourceRoutes from './modules/resources/routes'

/** initialize database connections */
// initializeMongoDB()
initializeDatasets()

/**
 * Initialize express application to hook all middleware
 */
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(cookieParser())

/** alive message on landing page */
app.get('', (req, res) => {
  res.json({ alive: true })
})

app.use('/resource', ResourceRoutes)

app.use(HttpExceptionTransformer)
export default app
