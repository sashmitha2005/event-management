const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

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
        res.json({ message: 'Event created successfully', event: newEvent });
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(400).send('Error creating event');
    }
});

app.delete('/delete', async(req, res) => {
    try{
        const data = req.body;
        const result = await Event.findByIdAndDelete(data.id);
        console.log(req.body);
        res.end("Success");
    } catch(err){
        console.error('Error deleting event:', err);
        res.status(400).send("error");
    }
});

const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
