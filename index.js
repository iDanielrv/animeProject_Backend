const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
var cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



dotenv.config();
const port = 4000;
secretOrPrivateKey = `${process.env.TOKEN_SECRET}`
cookieToken = '';

app.get('/', (req, res) => {
    res.cookie('name', 'GeeksForGeeks').send('cookies created')
})


const maxAge = 3 * 24 * 60 * 60;
const createToken = (email) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ email: email }, secretOrPrivateKey, function (err, token) {
            if (err) {
                reject(err);
            } else {
                console.log(token);
                resolve(token);
            }
        });
    });
};



app.get('/register', (req, res) => {
    console.log(req.cookies);
    console.log('Signed Cookies: ', req.signedCookies)
    res.send('cookie created');
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    const {email, password } = req.body
    try {
        const user = await User.create({ email, password });
        let jwtData = user.email;
        createToken(jwtData)
            .then(token => {
                res.cookie('jwt', token, {
                    maxAge: 1200000
                });
                res.status(200).json({msg: 'token criado com sucesso!'});
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Erro ao criar o token' });
            });
    } catch (error) {
        console.log(error);       
    }
})

mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true })
    .then((result) => {
    app.listen(port, () => {
        console.log(`Server is running on: http://localhost:${port}/ `);
    })

})
.catch((error) => {
    console.log(error);
})
