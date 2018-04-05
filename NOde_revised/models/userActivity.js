var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userActivitySchema = new Schema({

    user_email: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    loginDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("UserActivity", userActivitySchema);