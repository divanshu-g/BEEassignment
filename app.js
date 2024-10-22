const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


let tasks = [];


app.get('/todo', (req, res) => {
    res.render('todo', { tasks: tasks });
});


app.post('/addtask', (req, res) => {
    const newTask = req.body.task; 
    if (newTask) {
        tasks.push(newTask);  
    }
    res.redirect('/todo');
});

app.post('/deletetask', (req, res) => {
    const taskIndex = req.body.taskIndex;  
    if (taskIndex !== undefined) {
        tasks.splice(taskIndex, 1);
    }
    res.redirect('/todo');  
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});