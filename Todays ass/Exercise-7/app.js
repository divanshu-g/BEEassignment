const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
let isLoggedIn = true;  

app.get('/', (req, res) => {
    res.render('navigation', { isLoggedIn: isLoggedIn });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});