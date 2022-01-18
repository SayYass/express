const express = require('express');
const router = require('./routes');
const log = require('./middleware/logger')
const path = require('path')

const app = express();
app.use(express.urlencoded({extended:true}))
app.use.apply('/public' , express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(router);
app.use(( req, res, next ) => {
    res.status(404);
    res.send({
        status : 'Failed',
        message : 'Resource ' +  req.originalUrl + ' NotFound'
    });
});

app.listen(3000, () => console.log('Server http://localhost:3000'))

