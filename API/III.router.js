const { create, show, update, deleteModule, login } = require('./II.controller');

const router = require('express').Router();

const {checkToken} = require('../auth/auth');

router.post("/create", checkToken, create);
router.get("/show", show);
router.patch("/update/:module_id", update);
router.delete("/delete/:module_id", deleteModule);
router.get("/login/:username", login);

module.exports = router;