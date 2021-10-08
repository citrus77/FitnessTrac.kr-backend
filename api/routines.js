// api/routines.js
const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils');

const { 
    getAllPublicRoutines, 
    createRoutine, 
    getRoutineById, 
    updateRoutine, 
    destroyRoutine,
    addActivityToRoutine,
} = require('../db');


router.post('/:routineId/activities',requireUser, async (req, res, next) => {
    try {
        const { routineId, activityId, count, duration } = req.body;
        const addedRoutineActivity = await addActivityToRoutine({ routineId, activityId, count, duration });

        console.log(addedRoutineActivity, "<<<<<<<<<<<<000000000000000")
        console.log(routineId, activityId, '<<<<<<---------------')
        console.log(addedRoutineActivity.routineId, addedRoutineActivity.activityId, '<<<<<<<<===========')
        res.send({addedRoutineActivity});                 
    } catch (error) {
        next (error);
    };
});

router.patch('/:routineId', requireUser, async (req, res, next) => {
    try {
        const routine = await getRoutineById(req.params.routineId);
        const isOwner = req.user.id === routine.creatorId;
        if (isOwner) {
            const id = routine.id;
            const { isPublic, name, goal } = req.body;
            const updatedRoutine = await updateRoutine({id, isPublic, name, goal} );
            res.send(updatedRoutine);
        } else {
            res.status(401);
            next({
                name: 'IncorrectOwnerError',
                message: 'You must be the creator of this routine to update it'
            });
        };
    } catch (error) {
        next (error)
    };
});

router.delete('/:routineId', requireUser, async (req, res, next) => {
    try {
        let routine = await getRoutineById(req.params.routineId);
        const isOwner = req.user.id === routine.creatorId;
        if (isOwner) {
            const { routineId } = req.params;
            const deletedRoutine = await destroyRoutine(routineId);
            routine = await getRoutineById(req.params.routineId);
            if (!routine) {
                res.status(200).send(deletedRoutine)
            };
        } else {
            res.status(401);
            next({
                name: 'IncorrectOwnerError',
                message: 'You must be the creator of this routine to update it'
            });
        };
    } catch (error) {
        next (error);
    };
});


router.post('/', requireUser, async (req, res, next) => {
    if (req.user) {
        const creatorId = req.user.id;
        const { isPublic, name, goal } = req.body;
        const newRoutine = await createRoutine({creatorId, isPublic, name, goal});
        
        if (newRoutine) {
            res.send(newRoutine);
        } else {
            next ({
                name: 'FailedCreate',
                message: `Cannot create post with data isPublic: ${isPublic}, name: ${name}, goal: ${goal}`
            });
        };
    };    
});

router.get('/', async (req, res, next) => {
    try {
        const routines = await getAllPublicRoutines();
        res.send(routines);
    } catch (error) {
        next (error);
    };
});


router.use((req, res, next) => {
    console.log('A request is being made to /routines');
    next();
})

module.exports = router;