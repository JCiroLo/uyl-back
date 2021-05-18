const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../validation/registry");

const regCtrl = {};

const User = require("../models/User");

regCtrl.createUser = (req, res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] })
        .then(user => {
            if (user) {
                if(user.name === req.body.name){
                    return res.status(400).json({ name: "Name already exists" });
                }
                else{
                    return res.status(400).json({ email: "Email already exists" });
                }
                
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
};

module.exports = regCtrl;