import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import ID from './Schema/details.js';
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const PORT =  process.env.PORT_URL ;

// Middleware
app.use(express.json());
app.use(cors());

// database connection
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connection successful'))
    .catch(error => console.log(`MongoDB connection failed due to ${error}`));

// Route to Add ID
app.post('/add', async (req, res) => {
    const { number, data } = req.body;
    
    if (!data) {
        return res.status(400).json({ message: 'Data cannot be empty!' });
    }

    // for adding data to mongo
    try {
        const newID = new ID({ number, data });
        await newID.save();

        res.status(201).json({ message: 'ID added successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding ID', error });
    }
});

app.get('/search/:id', async (req, res) => {
    const { id } = req.params;
    try {

        // searching id in mongo
        const foundID = await ID.findOne({ number: id.toString() });

        if (foundID) {
            // showing it to the frontend
            res.status(200).json({ data: foundID.data });
        } else {
            res.status(404).json({ message: 'ID not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error searching for ID', error });
    }
});

// for showing all the calls present in mongo
app.get('/all', async (req, res) => {
    try {

        // searching id in mongo
        const alldata = await ID.find();
        res.status(200).json(alldata);

    } catch (error) {
        res.status(500).json({ message: 'Error searching for ID', error });
    }
});

// for deleteing selected data from mongo
// Route for deleting selected data from MongoDB
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const deletedItem = await ID.findOneAndDelete({ number: id }); 
        if (deletedItem) {
            return res.status(200).json({ message: 'Item deleted successfully!' });
        } else {
            return res.status(404).json({ message: 'ID not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
});

// for editing
app.put('/edit/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const { data } = req.body; // Extract the new data from request body

    // Check if data is provided
    if (!data) {
        return res.status(400).json({ message: 'Data cannot be empty!' });
    }

    try {
        // Update the item in MongoDB
        const editItem = await ID.findOneAndUpdate(
            { number: id },           // Query to find the item
            { data: data },          // New data to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        if (editItem) {
            return res.status(200).json({ message: 'Item updated successfully!', updatedItem: editItem });
        } else {
            return res.status(404).json({ message: 'ID not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});