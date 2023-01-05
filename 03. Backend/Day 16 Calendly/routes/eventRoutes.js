const express = require('express');
const { userInfo } = require('os');
const router = express.Router();
const Event = require('../models/eventModel');
const isAuthencticated = require('../utils/validators');
const { validateEmail } = require('../utils/validators');

router.post('/create', async (req, res) => {
    try{
        const{
            menteeEmail,
            mentorID,
            schedule,
            title,
            description,
            day,
            start,
            end
        } = req.body;

        if(!validateEmail(menteeEmail)){
            return res.status(400).json({ err: "Invalid Email "});
        }

        const foundUser = await user.Model.findById(mentorID);

        if(!foundUser) {
            return res.status(404).json({ err: "Mentor not found"});
        }

        const foundschedule = await scheduleModel.findById(schedule);

        if(!foundUser) {
            return res.status(400).json("No availability set");
        }

        if(start < foundschedule.dayStart || end > foundschedule.dayEnd ) {
            return res.status(400).json({
                err: " Not in between availability time"
            })
        }

        const foundClashingMenteeEvent = await Event.findOne({
            menteeEmail,
            day,
            start: { $lte: end}, //less than equalto
            end: { $gte: start}
        });

        if(foundClashingMenteeEvent) {
            return res.status(400).json({
                err: "Clashing meetings"
            })
        }

        const foundClashingMentorEvent = await Event.findOne({
            mentorID,
            day,
            start: { $lte: end },
            end: { $gte: start}
        });

        if(foundClashingMentorEvent) {
            return res.status(400).json({
                err: "Clashing meetings"
            })
        }

        const newEvent = new Event ({
            menteeEmail,
            mentorID,
            schedule,
            title,
            description,
            day,
            start,
            end
        });

        await newEvent.save();
        founduUser.events.push(newEvent);
        foundSchedule.events.push(newEvent);
        await foundUser.save(); 
        await foundSchedule.save();


        return res.status(201).json(newEvent);


    }catch(e){
        console.log(e);
        res.status(500).json({ err: err.message});
    }
})



router.get('/get/:eventID', async (req, res ) => {
    try{

        const foundEvent = await Event.findById(req.params.eventID);
        if(!foundEvent) {
            return res.status(400).json({ err: "No event found "})
        }

        return res.status(200).json(foundEvent)

    }catch (e) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
})

// delete event
// delete from schedule
// delete from user

router.delete('/delete/:eventID', isAuthenticated, async (req, res ) => {
    try{

        const foundEvent = await Event.findById(req.params.eventID);
        if(!foundEvent) {
            return res.status(400).json({ err: "No event found "})
        }

        const foundUser = await userModel.findById(req.user.id);
        if(!foundUser) {
            return res.status(400).json({ err: "User not found "});
        }

        const foundSchedule = await schedule.findById(foundEvent.schedule);
        if(!foundSchedule) {
            return res.status(400).json({ err: "Schedule not found "});
        }

        await foundUser.events.pull(foundEvent);
        await foundUser.save();
        await foundSchedule.events.push(foundEvent);
        await foundSchedule.save();
        await foundEvent.delete();

        return res.status(200).json({msg: "Event deleted"})

    }catch (e) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
})


module.exports = router;