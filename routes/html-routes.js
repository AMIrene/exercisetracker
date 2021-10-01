const router = require("express").Router();

const path = require("path");

// route to get to homepage 
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// route to get to workout stats dashboard page
router.get("/stats", function(req, res){
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// route to add your exercise page 
router.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;