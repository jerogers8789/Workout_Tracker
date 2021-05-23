const Workout = require("../models/workout.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.route('/api/workouts')
.post( async ({ body }, res) => {
 try{const workoutData = await Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })}
    catch(message) {
      console.log(message);
    };
})
.get( async (req, res) => {
  try{const workoutData = await Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })}
      catch(err) {
        res.json(err);
      };
  });

router.put('/api/workouts/:id', ({ params, body }, res) => {

  Workout.findOneAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  Workout.find({})
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;