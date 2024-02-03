import express from "express"
import paisRoutes from "./routes/pais-mysql.routes.js"
import countriesRoutes from "./routes/country-pg.routes.js"
import {PORT} from "./config.js"

const app = express()

app.listen(PORT)

console.log(`Server en el puerto ${PORT}`)

app.use(express.json())

app.use("/v1",paisRoutes)
app.use("/v2",countriesRoutes)

app.use((_req, res, next) => {
    res.status(404).json({ error: "Endpoint incorrecto, favor validar la documentación" })
})
