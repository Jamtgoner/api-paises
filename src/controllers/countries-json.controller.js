import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilePath = path.resolve(__dirname, '../json-db.json');

export const getPaises = async (_req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  try {
    // Lee el contenido del archivo ../json-db.json de forma asíncrona
    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData);

    res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const readAndProcessJson = async () => {
  try {
    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    throw new Error(`Error al leer o procesar el archivo JSON: ${error.message}`);
  }
};

export const getPais = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const data = await readAndProcessJson();

    const pais = data.find((item) => item.id === parseInt(req.params.id, 10));

    if (!pais) {
      return res.status(404).json({ error: "Pais no existe, verificar id" });
    }

    res.json(pais);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRandom = async (_req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const data = await readAndProcessJson();

    // Obtén 20 elementos al azar
    const resultadosProcesados = data
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);

    res.json(resultadosProcesados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPaisDiv = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const data = await readAndProcessJson();

    const paises = data.filter((pais) => pais.codigoDivisa.includes(req.params.codDiv));

    if (paises.length === 0) {
      return res.status(404).json({ error: "No hay ningun pais con esa divisa" });
    }

    res.json(paises);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPaisesIdioma = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const data = await readAndProcessJson();

    const resultadosProcesados = data.filter((pais) => pais.idioma.includes(req.params.idioma));

    res.json(resultadosProcesados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


