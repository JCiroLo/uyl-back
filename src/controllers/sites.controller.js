const createCtrl = {};

const Site = require("../models/Site");
const User = require("../models/User");

// Load input validation
const validateCreateSiteInput = require("../validation/sites");
const { query } = require("express");
const { json } = require("body-parser");

createCtrl.createSite = (req, res) => {

    // Form validation
    const { errors, isValid } = validateCreateSiteInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const title = req.body.title;
    const content = req.body.content;
    const userID = req.body.userID;
    const thumb = req.body.thumb;

    const newSite = new Site({
        title,
        content,
        userID,
        thumb
    });

    newSite
        .save()
        .then(site => res.json(site))
        .catch(err => console.log(err));
};

createCtrl.getUserSites = async (req, res) => {
    const sites = await Site.find({ userID: req.params.id });
    res.json(sites);
}

createCtrl.deleteSite = async (req, res) => {
    await Site.findByIdAndDelete(req.params.id);
    res.json({ message: "Sitio eliminado" });
};

createCtrl.getSiteById = async (req, res) => {
    try {
        const site = await Site.findById(req.params.id);
        res.json(site);
    } catch (e) {
        res.status(400).json({ notFound: true });
    }
}

createCtrl.getSitesByKey = async (req, res) => {
    try {
        const { key } = req.params
        const sites = await Site.find({ title: { $regex: "(?i).*" + key + ".*" } });
        res.json(sites);
    } catch (e) {
        res.status(400).json({ notFound: true });
    }
}

createCtrl.rateSite = async (req, res) => {
    try {
        const { action, userID } = req.body;
        if (action) { // Rate
            await Site.findOneAndUpdate({ _id: req.params.id }, { $inc: { "rating.rateUp": 1 } })
            await User.findOneAndUpdate({ _id: userID }, { $push: { ratedSites: req.params.id } })
            res.json(true);
        }
        else { // Unrate
            await Site.findOneAndUpdate({ _id: req.params.id }, { $inc: { "rating.rateUp": -1 } })
            await User.findOneAndUpdate({ _id: userID }, { $pull: { ratedSites: req.params.id } })
            res.json(true);
        }
    } catch (e) {
        console.log(e.message);
        res.json(false);
    }
}

createCtrl.viewSite = async (req, res) => {
    try {
        await Site.findOneAndUpdate({ _id: req.params.id }, { $inc: { "rating.views": 1 } })
        res.json(true);
    } catch (e) {
        console.log(e.message);
        res.status(400).json(false);
    }
}

module.exports = createCtrl;