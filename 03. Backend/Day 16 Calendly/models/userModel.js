const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    email: {
        name: String,
        required: true
    },
    password: {
        type: String,
        required: true
        },

    events: [
        {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
],
schedules: [
    {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Schdule"
    }
],

})

module.exports = Mongoose.model("User", userSchema);