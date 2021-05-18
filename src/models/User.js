const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    followers: {
        type: Number,
        default: 0
    },
    following: [],
    ratedSites: [],
    searchHistory: [],
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = model("User", userSchema);