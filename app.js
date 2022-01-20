const express = require('express');
const productRouter = require('./app/product/routes');
const productRouterv2 = require('./app/product-v2/routes');
const log = require('./middleware/logger')
const path = require('path')
const Port = process.env.PORT || 3000;
const logger = require('morgan')

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))
app.use('/public' , express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterv2);
app.use(( req, res, next ) => {
    res.status(404);
    res.send({
        status : 'Failed',
        message : 'Resource ' +  req.originalUrl + ' NotFound'
    });
});

app.listen(Port, () => console.log(`Server http://localhost:3000 `))

