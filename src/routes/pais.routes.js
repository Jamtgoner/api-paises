import { Router } from "express";
import {getPaises,getPais, getRandom, getPaisDiv, getPaisesIdioma } from "../controllers/pais.controller.js"

const router = Router()

router.get("/paises", getPaises )

router.get("/pais/:id", getPais)

router.get("/random", getRandom)

router.get("/divisa/:codDiv", getPaisDiv)

router.get("/idioma/:idioma", getPaisesIdioma)

export default router