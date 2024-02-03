import { poolPG } from "../db.js";

export const getPaises = async (_req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { rows } = await poolPG.query(`SELECT * FROM country`);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados" });
    }

    const resultadosProcesados = rows.map((pais) => ({
      ...pais,
      idioma: typeof pais.idioma === 'string' ? pais.idioma.split(';').map(item => item.trim()) : [],
      gentilicio: typeof pais.gentilicio === 'string' ? pais.gentilicio.split(';').map(item => item.trim()) : []
    }));

    res.json(resultadosProcesados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getPais = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { rows } = await poolPG.query(`SELECT * FROM country WHERE id = $1`, [req.params.id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Pais no existe, verificar id" });
    }

    const paisFiltrado = rows.map((pais) => ({
      ...pais,
      idioma: typeof pais.idioma === 'string' ? pais.idioma.split(';').map(item => item.trim()) : [],
      gentilicio: typeof pais.gentilicio === 'string' ? pais.gentilicio.split(';').map(item => item.trim()) : []
    }));

    res.json(paisFiltrado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getRandom = async (_req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const {rows} = await poolPG.query(`SELECT * FROM country ORDER BY RANDOM() LIMIT 20;`);

    const resultadosProcesados = rows.map((pais) => ({
      ...pais,
      idioma: typeof pais.idioma === 'string' ? pais.idioma.split(';').map(item => item.trim()) : [],
      gentilicio: typeof pais.gentilicio === 'string' ? pais.gentilicio.split(';').map(item => item.trim()) : []
    }));

    res.json(resultadosProcesados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPaisDiv = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const {rows} = await poolPG.query(`SELECT * FROM country WHERE "codigoDivisa" ILIKE $1`, [`%${req.params.codDiv}%`]);

    if (rows.length === 0) {
        return res.status(404).json({ error: "No hay ningun pais con esa divisa" });
    }
    
    const paisesProcesados = rows.map(pais => {
        const idiomaArray = pais.idioma ? pais.idioma.split(';').map(item => item.trim()) : [];
        const gentilicioArray = pais.gentilicio ? pais.gentilicio.split(';').map(item => item.trim()) : [];
    
        return {
            ...pais,
            idioma: idiomaArray,
            gentilicio: gentilicioArray
        };
    });
    
    res.json(paisesProcesados);
    
    
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

export const getPaisesIdioma = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const {rows} = await poolPG.query(`SELECT * FROM country WHERE idioma ILIKE $1`, [`%${req.params.idioma}%`]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No hay ningun pais con este idioma" });
  }
  
  const paisesProcesados = rows.map(pais => {
      const idiomaArray = pais.idioma ? pais.idioma.split(';').map(item => item.trim()) : [];
      const gentilicioArray = pais.gentilicio ? pais.gentilicio.split(';').map(item => item.trim()) : [];
  
      return {
          ...pais,
          idioma: idiomaArray,
          gentilicio: gentilicioArray
      };
  });
  
  res.json(paisesProcesados);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};