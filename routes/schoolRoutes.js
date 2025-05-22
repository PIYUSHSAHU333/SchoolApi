const express = require("express");
const router = express.Router();
const {addSchool, listSchools} = require("../controllers/schoolController.js");
const {validateAddSchool, validateListSchools} = require("../middlewares/validateSchool.js")
router.post("/addSchool", validateAddSchool, addSchool);
router.get("/listSchools", validateListSchools,listSchools);

module.exports = router