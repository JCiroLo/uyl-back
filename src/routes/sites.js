const { Router } = require("express");
const router = Router();

const { 
    createSite, 
    getUserSites, 
    deleteSite, 
    getSiteById, 
    getSitesByKey,
    rateSite, 
    viewSite
} = require("../controllers/sites.controller");

router.route("/create")
    .post(createSite);

router.route("/delete/:id")
    .delete(deleteSite);

router.route("/userSites/:id")
    .get(getUserSites)
    .put(viewSite);

router.route("/detail/:id")
    .get(getSiteById)
    .put(rateSite);

router.route("/search/:key")
    .get(getSitesByKey);

module.exports = router;