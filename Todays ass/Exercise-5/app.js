const express = require('express');
const app = express();
const port = 3000;


const items = [
    { id: 1, name: 'The Great Gatsby', category: 'book'},
    { id: 2, name: 'Inception', category: 'movie'},
    { id: 3, name: 'Interstellar', category: 'movie'},
    { id: 4, name: 'To Kill a Mockingbird', category: 'book'},
    { id: 5, name: 'The Matrix', category: 'movie'}
];


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/search', (req, res) => {
    const query = req.query.q || '';  
    
    // Filter items based on the search query
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  
    res.render('search', {
        query,
        results: filteredItems
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});