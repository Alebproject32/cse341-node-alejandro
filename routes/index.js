const express = require("express");
const router = express.Router();
const contactsController = require("../controllers");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));
router.get("/professional", contactsController.getProfessionalData);
router.use("/contacts", require("./contacts"));

module.exports = router;
