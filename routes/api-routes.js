
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
const Workout = require("../models/workouts.js");


// Aggregation function from mongoDB to add totalDuration
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
          totalDuration:
              { $sum: '$exercises.duration' },
         
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
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Create a new workout
router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  Workout.create({})
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    // "runValidators" will ensure new exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;