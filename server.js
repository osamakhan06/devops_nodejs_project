const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
const PORT =  3000;
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
 
// Sample data (in-memory storage)
let users = [];
 
// CRUD Operations
 
// Create a user
app.post('/users', (req, res) => {
const user = req.body;
users.push(user);
res.status(201).json(user);
});
 
// Read all users
app.get('/users', (req, res) => {
res.json(users);
});
 
// Read a single user by ID
app.get('/users/:id', (req, res) => {
const userId = req.params.id;
const user = users.find(u => u.id === userId);
if (user) {
res.json(user);
} else {
res.status(404).send('User not found');
}
});
 
// Update a user by ID
app.put('/users/:id', (req, res) => {
const userId = req.params.id;
const userIndex = users.findIndex(u => u.id === userId);
if (userIndex > -1) {
users[userIndex] = { ...users[userIndex], ...req.body };
res.json(users[userIndex]);
} else {
res.status(404).send('User not found');
}
});
 
// Delete a user by ID
app.delete('/users/:id', (req, res) => {
const userId = req.params.id;
users = users.filter(u => u.id !== userId);
res.status(204).send();
});
 
// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});