const { Router } = require("express");
const router = Router();

const {
    getUserById, 
    updateUserName, 
    updateUserPassword, 
    getUserNameById, 
    followUser, 
    getSearchHistory,
    addToHistory
} = require("../controllers/users.controller");

router.route("/get/:id").get(getUserById);

router.route("/get/name/:id").get(getUserNameById)

router.route("/get/history/:id")
    .get(getSearchHistory)
    .post(addToHistory);

router.route("/update/name/:id").put(updateUserName);

router.route("/update/follow/:id").put(followUser);

router.route("/update/password/:id").put(updateUserPassword);

module.exports = router;