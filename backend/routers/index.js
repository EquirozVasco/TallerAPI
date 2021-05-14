const express = require("express");
const router = express.Router();
const user_controller = require('../controllers/users.controller')
const reports_controller = require('../controllers/reports.controller')
const reports_controller2 = require('../controllers/reports.controller2')


router.get("/reportes/rutas",reports_controller.getReportRutas);
router.get("/reportes/rutas",reports_controller2.getReportRutaspartida);
router.post("/usuarios",user_controller.saveUser);
router.post("/usuarios",user_controller.saveRoute);

module.exports = router;