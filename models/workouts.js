const mongoose = require("mongoose");

// Schema 
const Schema = mongoose.Schema;

// Sets new workout schema
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  exercises: [
    {
      name : {
        type : String,
        trim : true,
        required : "Enter a name for your exercise"
      },
      type : {
        type: String,
        trim : true,
        required : "Enter exercise type"
      },
      duration : {
        type: Number,
        required : "Enter exercise duration"
        
      },
      distance : {
        type : Number,
        
      },
      weight: {
        type : Number
      },
      sets: {
        type : Number
      },
      reps: {
        type : Number
      }
    }
  ]
});


const Workout = mongoose.model("workout", WorkoutSchema);


module.exports = Workout;



