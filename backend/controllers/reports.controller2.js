const _pg = require("../services/postgres.service");
const mergeSort = require("../services/merge-sort.service");
const createExcel = require("../services/excel.service");
const fs = require("fs");


const getReportRutaspartida = async (req, res) => {
    //Este algoritmo arroja el reporte de los lugares de partida de las rutas con nombre "Bello", ordenadas por el tiempo estimado del trayecto, además exporta a excel.
  try {
    let sql = "SELECT * FROM rutas where punto_partida='Bello'";
    let response_db = await _pg.execute(sql);
    let rows = response_db.rows;
    rows = mergeSort(rows);

    let headers = [
      { header: "nombre_ruta", key: "nombre_ruta" },
      { header: "tiempo_estimado", key: "tiempo_estimado" },
      { header: "distancia", key: "distancia" },
      { header: "punto_partida", key: "punto_partida" },
      { header: "punto_llegada", key: "punto_llegada" },
    ];
    let buffer = await createExcel(headers, rows, "Punto partida Bello");
    fs.writeFileSync("./temp/reporte.xlsx", buffer);
    return res.download("./temp/reporte.xlsx", "partida-Bello.xlsx");
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

module.exports = { getReportRutaspartida };