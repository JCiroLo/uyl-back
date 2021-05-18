const { Schema, model } = require("mongoose");

const siteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        required: true,
        type: String
    },
    thumb: {
        required: true,
        type:Boolean
    },
    rating: {
        views: {
            require: true,
            type: Number,
            default: 0
        },
        rateUp: {
            require: true,
            type: Number,
            default: 0
        }
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = model("Site", siteSchema);