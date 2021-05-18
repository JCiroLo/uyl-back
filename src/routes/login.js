const { Router } = require("express");
const router = Router();

const { logUser } = require("../controllers/login.controller");

router.route("/")
    .post(logUser);


module.exports = router;