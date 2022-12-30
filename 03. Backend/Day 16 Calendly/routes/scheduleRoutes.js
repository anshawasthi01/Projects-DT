const express = require("express");
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');

const Schedule = require('../models/scheduleModel');
const User = require('../models/userModel');

router.post("/create", isAuthenticated, async (req, res) => {
    try {
        const { day, dayStart, dayEnd, eventDuration } = req.body;
        const suer = req.user.id;
        const foundUser = await User.findById(user);

        if(!foundUser) {
            return res.status(404).json( {
                err: "User not found"
            })
        }
        const presentSchedule = await schedule.findOne( { user, day});

        if(presentSchedule) {
            return res.status(403).json( { err: "Schedule already exists"});
        }

        const newSchedule = new Schedule({
            user,
            day,
            dayStart,
            dayEnd,
            eventDuration
        });

        await newSchedule.save();
        foundUser.schedules.push(newSchedule);
        await foundUser.save();

        return res.status(200).json(newSchedule);
    } catch(e) {
        return res.status(500).json({ err: e});
    }
});

router.get("/get/:userId", async (req, res) => {
    try{
        const foundUser = await User.findById(req.params.userId);
        if(!foundUser) {
            return res.status(404).json({ err: "User not found"});
        }

        const schdule = await Schedule.find({user: req.params.userId});
        res.status(200).json(schdule);



        
    }catch (e) {
        return res.status(500).json({ err: e});
    }

}) 



module.exports = router;