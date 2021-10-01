
// const router = require("express").Router();

// const workoutdb = require("../models/workouts");

// // GET all workouts
// router.get("/api/workouts", (req, res) => {
// 	workoutdb.find()
// 		.then((workoutdbData) => {
// 			res.json(workoutdbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// // GET request
// router.get("/api/workouts/range", (req, res) => {
// 	workoutdb.find()
// 		.then((workoutdbData) => {
// 			res.json(workoutdbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// // new workout
// router.post("/api/workouts", ({ body }, res) => {
// 	workoutdb.create(body)
// 		.then((workoutdbData) => {
// 			res.json(workoutdbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// // update workout by id
// router.put("/api/workouts/:id", ({ body, params }, res) => {
// 	workoutdb.findByIdAndUpdate(params.id, { $push: { exercises: body } })
// 		.then((workoutdbData) => {
// 			res.json(workoutdbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });


// module.exports = router;






const router = require("express").Router();
const db = require("../models");


// Aggregation function from mongoDB to add totalDuration
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
          totalDuration:
              { $sum: '$exercises.duration' },
          totalWeight:
              { $sum: '$exercises.weight' }
      }
  }
])
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to add sort
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(10)
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Create a new workout
router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create({})
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to add exercise to current workout
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((updateWorkout) => {
      res.json(updateWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


module.exports = router;