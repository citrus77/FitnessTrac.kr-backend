// api/routine_activities.js
const express = require('express');
const router = express.Router();
const { updateRoutineActivity, getRoutineById, destroyRoutineActivity, getAllRoutineActivities,  } = require('../db');
const { requireUser } = require('./utils');

// router.patch('/:routineActivityId', requireUser, async(req, res, next) => {
//     try {
//         console.log(req.params)
//         const { routineActivityId } = req.params;
//         const { routineId, count, duration } = req.body;
//         const routine = await getRoutineById(routineId);
//         if (routine) {            
//             const isOwner = req.user.id === routine.creatorId;
//             if (isOwner) {
//                 const updatedRoutineActivity = updateRoutineActivity({
//                     routineActivityId, 
//                     count, 
//                     duration
//                 })
//                 res.status(200).send(updatedRoutineActivity)
//                 next();
//             } else {
//                 res.status(401);
//                 next({
//                     name: 'IncorrectOwnerError',
//                     message: 'You must be the creator of this routine to update it'
//                 });
//             };
//         };
//     } catch (error) {
//         next(error);
//     };
// });

// router.delete('/:routineActivityId', requireUser, async (req, res, next) => {
//     try {
//         const { routineActivityId } = req.params;
//         const routineActivityToCheck = await getRoutineActivityById(routineActivityId);
//         const routine = await getRoutineById(routineActivityToCheck.routineId);
//         if (routine) {            
//             const isOwner = req.user.id === routine.creatorId;
//             if (isOwner) {
//                 const deletedRoutineActivity = await destroyRoutineActivity(routineActivityId);
//                 res.send(deletedRoutineActivity);        
//             } else {
//                 res.status(401);
//                 next({
//                     name: 'IncorrectOwnerError',
//                     message: 'You must be the creator of this routine to delete it'
//                 });
//             };        
//     } catch (error) {
//         next (error);
//     };
// });

router.use((req, res, next) => {
    console.log('A request is being made to /routine_activities');
    next();
});

module.exports = router;