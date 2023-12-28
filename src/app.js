import express from "express"
import paisRoutes from "./routes/pais.routes.js" // Importamos las rutas de pais.routes.js el nombre paisRoutes es a eleccion propia

const app = express()

app.use(express.json())
app.use("/v1",paisRoutes)
app.use((req, res, next) => {
    res.status(404).json({ error: "Endpoint incorrecto, favor validar la documentación" })
})

export default app;
