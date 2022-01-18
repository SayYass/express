const express = require('express');
const router = require('./routes');
const log = require('./middleware/logger')
const path = require('path')
const Port = 3000;

const app = express();
app.use(express.urlencoded({extended:true}))
app.use('/public' , express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(router);
app.use(( req, res, next ) => {
    res.status(404);
    res.send({
        status : 'Failed',
        message : 'Resource ' +  req.originalUrl + ' NotFound'
    });
});

app.listen(process.env.PORT || Port, () => console.log(`Server http://localhost:3000`))

