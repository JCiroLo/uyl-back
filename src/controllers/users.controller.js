const bcrypt = require("bcryptjs");

const usersCtrl = {};

const User = require("../models/User");

usersCtrl.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        res.status(400).json("error");
    }

};

usersCtrl.getUserNameById = async (req, res) => {
    try {
        const { name, followers } = await User.findById(req.params.id);
        res.json({ name, followers })
    } catch (e) {
        res.status(400).json("error");
    }

}

usersCtrl.updateUserName = async (req, res) => {
    const { name, pass } = req.body;
    try {
        const user = await User.findOne({ _id: req.params.id });
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            await User.findOneAndUpdate({ _id: req.params.id }, { name })
            res.json(true)
        }
        else {
            return res.status(400).json({ error: "An error has ocurred" });
        }
    } catch (e) {
        return res.status(400).json({ error: "An error has ocurred" });
    }
};

usersCtrl.updateUserPassword = async (req, res) => {
    const { newPass, currentPass } = req.body;
    try {
        const user = await User.findOne({ _id: req.params.id });
        const isMatch = await bcrypt.compare(currentPass, user.password);
        if (isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPass, salt, async (err, hash) => {
                    if (err) throw err;
                    const password = hash;
                    await User.findOneAndUpdate({ _id: req.params.id }, { password })
                    res.json(true)
                });
            });
        }
        else {
            return res.status(400).json({ error: "An error has ocurred" });
        }
    } catch (e) {
        return res.status(400).json({ error: "An error has ocurred" });
    }
};

usersCtrl.followUser = async (req, res) => {
    const { userID, action } = req.body; // userID: Al que quiero seguir
    try {
        //true: follow, false: unfollow
        if (action) {
            await User.findOneAndUpdate({ _id: req.params.id }, { $push: { following: userID } })
            await User.findOneAndUpdate({ _id: userID }, { $inc: { followers: 1 } })
            res.json(true);
        }
        else {
            await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { following: userID } })
            await User.findOneAndUpdate({ _id: userID }, { $inc: { followers: -1 } })
            res.json(true);
        }

    } catch (e) {
        console.log(e.message);
        return res.status(400).json(false);
    }
}

usersCtrl.addToHistory = async (req, res) => {
    try {
        const id = req.params.id;
        const { search } = req.body;

        const user = await User.findById(id);

        if (user.searchHistory.length >= 5) {
            const { searchHistory } = user;
            const removeLastHistory = searchHistory.splice(0, 4);

            user.set({ searchHistory: [search].concat(removeLastHistory) });
            await user.save();
        }
        else {
            user.set({ searchHistory: [search].concat(user.searchHistory) });
            await user.save();
        }
    }
    catch (e) {
        console.log("Error: aniadir elemento al historial de busqueda")
    }
}

usersCtrl.getSearchHistory = async (req, res) => {
    try {
        const { searchHistory } = await User.findById(req.params.id);
        res.json(searchHistory);
    }
    catch (e) {
        console.log("Error: Obtener historial de busqueda: " + e.message)
    }
}

module.exports = usersCtrl;