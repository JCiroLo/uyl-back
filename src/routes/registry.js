const { Router } = require("express");
const router = Router();

const { createUser } = require("../controllers/registry.controller");

router.route("/")
    .post(createUser);


module.exports = router;