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

        const scheduleStart = Number(dayStart.replace(":", "."));
        const scheduleEnd = Number(dayEnd.replace(":", "."));


        const newSchedule = new Schedule({
            user,
            day,
            dayStart: scheduleStart,
            dayEnd: scheduleEnd,
            eventDuration,
        });

        await newSchedule.save();
        foundUser.schedules.push(newSchedule);
        await foundUser.save();

        return res.status(201).json(newSchedule);
    } catch(e) {
        console.log(err);

        res.status(500).json({ err: err.message});
    }
});

// @route GET api/v1/schedule/get/:userID
// @desc Get schedule by user ID
// @access Public

router.get("/get/:userId", async (req, res) => {
    try{
        const foundUser = await User.findById(req.params.userId);
        if(!foundUser) {
            return res.status(404).json({ err: "User not found"});
        }

        const schdule = await Schedule.find({user: req.params.userId});
        res.status(200).json(schdule);     
    }catch (err) {
        console.log(err);


        return res.status(500).json({ err: err.message});
    }

});

// @route       PUT api/v1/schedule/get/:userID
// @desc        Update schedule by schedule ID
// @access      Public

router.get("/update/:scheduleId", isAuthenticated, async (req, res) => {
    try{
        const foundUser = await User.findById(req.params.scheduleId);

        if(!foundUser) {
            return res.status(404).json({ err: "Schedule not found"});
        }

        if (foundSchedule.events.length > 0)
            return res
                .status(403)
                .json({err: "Cannot delete schedule with events"});
        

        const { day, dayStart, dayEnd, eventDuration } = req.body;

        const scheduleStart = Number(dayStart.replace(":", "."));
        const scheduleEnd = Number(dayEnd.replace(":", "."));

        const updateSchedule = await Schedule.updateOne(
            { _id: req.params.scheduleID },
            { day, dayStart: scheduleStart, dayEnd: scheduleEnd, eventDuration}
        );
        res.status(200).json(updatedSchedule);
    }catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// @route Delete api/v1/schedule/delete/:scheduleID
// @desc Delete schedule by schedule ID
// @access Private

router.delete("/delete/:scheduleID", isAuthenticated, async (req, res) => {
    try{
        const foundUser = await User.findById(req.user.id);

        if(!foundUser) {
            return res.status(404).json( { err: "User not found" });
        }


        const foundSchedule = await Schedule.findById(req.params.scheduleID);

        if(!foundSchedule){
            return res.status(404).json({err: "Schedule not found"});
        }

        if (foundSchedule.events.length > 0) {
            return res.status(403)
            .json({err: "Cannot delete schedule with events"});
        }

        await Schedule.findByIdAndDelete(req.params.scheduleID);
        foundUser.schedules.pull(req.params.scheduleID);
        await foundUser.save();

        res.status(200).json({ msg: "Schedule deleted"});
    }catch (err){
        console.log(err);
        res.status(500).json({ err: err.message});
    }  
        
});

module.exports = router;