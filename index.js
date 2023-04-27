import express, { json } from 'express'
import { router } from './routes/routes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json' assert {type: "json"}
const app = express()
const PORT = 3000

app.use(express.json())

app.use("/api", router)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//assigns paths to api
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Sidan finns inte"
    })
})
//above api triggers on any use of the api where the wrong 
//link is written in html

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        err: err.type
    })
})

//above api triggers on any use of the api where error occurs.

app.listen(PORT, () => {
    console.log("Listening to port: " + PORT)
})

//listens to api activating and shows what port is active on launch
