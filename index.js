require('dotenv').config();
const express = require('express');
const cookies = require('cookie-parser');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const api = process.env.HOST || 'localhost';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookies());

app.use('/',require('./routes/pages_R'));
app.use('/users',require('./routes/users_R'));
app.use('/auth',require('./routes/auth_R'));
app.use('/categories',require('./routes/categories_R'));
app.use('/tasks',require('./routes/tasks_R'));

app.use('/', require('./routes/pages_R'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://${api}:${port}`);
});
