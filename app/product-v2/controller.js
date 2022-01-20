const fs = require('fs')
const path = require('path');
const Product = require('./model');


const store = async (req, res) => {
    const {name, price, stock, status} = req.body;
    const image =req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads' , image.originalname);
        fs.renameSync(image.path, target)
        try{
             Product.sync();
        const result = await Product.create({name , price, stock, status , image_url :  `http://localhost:3000/public/${image.originalname}`});
        res.send(result);
        }catch(e){
            res.send(e);
        }
    }

}

const index = async (req, res) => {
    try{
       
       const result = await Product.findAll();
        res.send(result);
    } catch(e){
        res.send(e)
    }
}

const view = async (req, res) => {
    try{
       
       const result = await Product.findByPk(req.params.id)
        res.send(result);
    } catch(e){
        res.send(e)
    }
}

const update = async (req, res) => {
    const image =req.file;
    if (image) {
        
        
        try{
            const target = path.join(__dirname, '../../uploads' , image.originalname);
        fs.renameSync(image.path, target)
            const result = await Product.update(req.body , {where : {id : req.params.id}})
             res.send(result);
         } catch(e){
             res.send(e)
         }
    }
   
}

const destroy = async (req, res) => {

    try{ 
       const result = await Product.destroy({where : {id : req.params.id}})
        res.send({status: 'berhasil menghapus data'});
    } catch(e){
        res.send(e)
    }
}

module.exports = {
    store,
    index,
    view,
    update,
    destroy

}