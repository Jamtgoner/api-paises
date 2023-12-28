import { pool } from "../db.js";
import { DB_NAME } from "../config.js";

export const getPaises = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const [result] = await pool.query(`SELECT * FROM ${DB_NAME}.pais`);

    // Procesar los resultados para convertir las cadenas en arrays
    const resultadosProcesados = result.map((pais) => ({
      ...pais,
      idioma: pais.idioma.split(';').map(item => item.trim()),
      gentilicio: pais.gentilicio.split(';').map(item => item.trim())
    }));

    res.json(resultadosProcesados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPais = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
      const [result] = await pool.query(`SELECT * FROM ${DB_NAME}.pais WHERE idPais = ?`, [req.params.id]);

      if (result.length === 0) {
          return res.status(404).json({ error: "Pais no existe, verificar id" });
      }
      // Procesar los resultados para convertir las cadenas en arrays
      const paisProcesado = {
          ...result[0],
          idioma: result[0].idioma.split(';').map(item => item.trim()),
          gentilicio: result[0].gentilicio.split(';').map(item => item.trim())
      };

      res.json(paisProcesado);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

export const getRandom = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const [result] = await pool.query(`SELECT * FROM ${DB_NAME}.pais ORDER BY RAND() LIMIT 20;`);

    // Procesar los resultados para convertir las cadenas en arrays
    const resultadosProcesados = result.map((pais) => ({
      ...pais,
      idioma: pais.idioma.split(';').map(item => item.trim()),
      gentilicio: pais.gentilicio.split(';').map(item => item.trim())
    }));

    res.json(resultadosProcesados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPaisDiv = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const result = await pool.query(`SELECT * FROM ${DB_NAME}.pais WHERE codigoDivisa LIKE ?`, [`%${req.params.codDiv}%`]);

    if (result.length === 0) {
        return res.status(404).json({ error: "No hay ningun pais con esa divisa" });
    }
    
    // Procesar los resultados para convertir las cadenas en arrays
    const paisesProcesados = result.map(pais => {
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
    const [result] = await pool.query(`SELECT * FROM ${DB_NAME}.pais WHERE idioma LIKE ?`, [`%${req.params.idioma}%`]);

    // Procesar los resultados para convertir las cadenas en arrays
    const resultadosProcesados = result.map((pais) => ({
      ...pais,
      idioma: pais.idioma.split(';').map(item => item.trim()),
      gentilicio: pais.gentilicio.split(';').map(item => item.trim())
    }));

    res.json(resultadosProcesados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
