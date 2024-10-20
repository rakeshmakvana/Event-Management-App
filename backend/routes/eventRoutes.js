const express = require("express");
const multer = require("multer");
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, likeEvent } = require("../controllers/eventController");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/createEvent", upload.single("image"), createEvent);
router.get("/allevents", getAllEvents);
router.get("/event/:id", getEventById);
router.put("/event/:id", upload.single("image"), updateEvent);  
router.delete("/event/:id", deleteEvent);                                     

module.exports = router;
