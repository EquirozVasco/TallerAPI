const _pg = require("../services/postgres.service");
const heapSort = require("../services/heap-sort.service");
const createExcel = require("../services/excel.service");
const fs = require("fs");

const getReportRutas = async (req, res) => {
    //Este algoritmo arroja el reporte de las rutas con nombre "Antioquia", ordenadas por la distancia del trayecto, además exporta a excel.
  try {
    let sql = "SELECT * FROM rutas where nombre_ruta='Antioquia'";
    let response_db = await _pg.execute(sql);
    let rows = response_db.rows;
    rows = heapSort(rows);

    let headers = [
      { header: "nombre_ruta", key: "nombre_ruta" },
      { header: "tiempo_estimado", key: "tiempo_estimado" },
      { header: "distancia", key: "distancia" },
      { header: "punto_partida", key: "punto_partida" },
      { header: "punto_llegada", key: "punto_llegada" },
    ];
    let buffer = await createExcel(headers, rows, "Rutas Antioquia");
    fs.writeFileSync("./temp/reporte.xlsx", buffer);
    return res.download("./temp/reporte.xlsx", "rutas-Antioquia.xlsx");
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};


module.exports = { getReportRutas };