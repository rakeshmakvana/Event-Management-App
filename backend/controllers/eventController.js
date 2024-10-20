const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    try {
        const eventData = req.body;
        eventData.image = req.file ? req.file.path : "";
        const newEvent = new Event(eventData);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error saving event');
        res.status(500).json({ error: "Failed to save the event to MongoDB"});
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events from MongoDB" });
    }
};

exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error("Error fetching event:", error); // Log the error details
        res.status(500).json({ error: "Failed to fetch event from MongoDB" });
    }
};


exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = req.file.path;
        }
        const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};