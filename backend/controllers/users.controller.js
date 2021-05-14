const _pg = require("../services/postgres.service");


const saveUser = async (req, res) => {
  try {
    let user = req.body;
    let sql = `INSERT INTO public.usuarios
    (id, nombre, correo, direccion, telefono, fecha_nacimiento, usuario, contrasena, tipo_usuario)
    VALUES('${user.id}', '${user.nombre}', '${user.correo}', 
    '${user.direccion}', '${user.telefono}', '${user.fecha_nacimiento}', '${user.usuario}', 
    '${user.contrasena}', '${user.tipo_usuario}');`
    ;

    await _pg.execute(sql);
    return res.send({
      ok: true,
      message: "Usuario creado",
      info: user,
    });
  } catch (error) {
    console.error(error);
    return res.send({
      ok: false,
      message: "Error al crear el usuario",
      info: error,
    });
  }
};

const saveRoute = async (req, res) => {
  // Este controlador inserta las rutas en la tabla rutas de la base de datos.
  try {
    let user = req.body;
    let sql = `INSERT INTO public.rutas
    (nombre_ruta, tiempo_estimado, distancia, punto_partida, punto_llegada)
    VALUES('${user.nombre_ruta}', '${user.tiempo_estimado}', '${user.distancia}', 
    '${user.punto_partida}', '${user.punto_llegada}');`
    ;

    await _pg.execute(sql);
    return res.send({
      ok: true,
      message: "Ruta creada",
      info: user,
    });
  } catch (error) {
    console.error(error);
    return res.send({
      ok: false,
      message: "Error al crear la ruta",
      info: error,
    });
  }
};


module.exports = {
  saveUser,
  saveRoute,
};