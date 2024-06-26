const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const connectionString = 'mongodb://127.0.0.1:27017/event-management';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const EventSchema = new mongoose.Schema({
    name: String,
    time: String,
    venue: String,
    date: String,
    content: String
});

const Event = mongoose.model('event-list', EventSchema);

app.post('/get_all_events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error('Error getting events:', err);
        res.status(500).send('Error retrieving events');
    }
});

app.post('/create_event', async (req, res) => {
    try {
        const data = req.body;
        const newEvent = new Event(data);
        await newEvent.save();
        res.json({ message: 'Event created successfully', _id: newEvent._id });
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(400).send('Error creating event');
    }
});

app.delete('/delete', async (req, res) => {
    try {
        const data = req.body;
        const result = await Event.findByIdAndDelete(data.id);
        res.end("Success");
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(400).send("error");
    }
});

// Route for updating an event
app.put('/update_event/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const updatedEventData = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, { new: true });
        res.json(updatedEvent);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(400).send('Error updating event');
    }
});


const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
