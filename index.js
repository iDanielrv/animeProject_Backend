const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 4000;

app.post('/', async (req, res) => {
    try {
        await fetch('https://api.jikan.moe/v4/seasons/now')
        .then((response) => response.json())
        .then((data) => {
            res.status(200).send(data);
        })
    } catch (error) {
        console.log(error);
    }
})

app.post('/register', async (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}/ `);
})