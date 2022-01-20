const fs = require('fs')
const path = require('path')
const connection = require('../../config/mysql');

const index = (req, res) => {
    const {search} = req.query;
    let exe = {};
 
    if(search){
        exe = {
        sql: 'SELECT * FROM products WHERE name LIKE ?',
        values : [`%${search}%`]
        }
        console.log(search)
    } else {
        exe = {
            sql: 'SELECT * FROM products'
        }
    }
    connection.query(exe, _response(res) ); 
    }


const view = (req, res) => { 
    connection.query({
        sql: 'SELECT * FROM products WHERE id=?' ,
        values: [req.params.id]
        }, _response(res) );    
        }

 const store = (req, res) => { 
    const {name, price, stok, status} = req.body; 
    const image = req.file;
    if ( image ) {
        const target = path.join(__dirname, '../../uploads' , image.originalname);
        fs.renameSync(image.path, target)
        connection.query({
           sql: 'INSERT INTO products (name, price, stok, status , image_url) VALUES (?,?,?,?,?)' ,
           values: [name, price, stok , status , `http://localhost:3000/public/${image.originalname}`]
           }, _response(res));  
           console.log(image.originalname)         
    }
}

const update = (req, res) => { 
    const {name, price, stok, status} = req.body; 
    const image = req.file;
    
    let sql = '';
    let values = [];
    if ( image ) {
        const target = path.join(__dirname, '../../uploads' , image.originalname);
        fs.renameSync(image.path, target)
         sql = 'UPDATE products SET name=?,price=?,stok=?,status=?, image_url=? WHERE id=?';
         values = [name, price, stok , status , `http://localhost:3000/public/${image.originalname}` , req.params.id]
    } else {
        sql = 'UPDATE products SET name=?,price=?,stok=?,status=? WHERE id=?';
        values = [name, price, stok , status, req.params.id];
    }
    connection.query({sql, values}, _response(res));            
}

const destroy = (req, res) => { 
    connection.query({
        sql: 'DELETE FROM products WHERE id=?' ,
        values: [req.params.id]
        }, _response(res) );    
        }
    const _response = (res) => {
        return (error, result) => {
            if(error){
                res.send({
                    status : 'failed',
                    respon : error
                }) 
            } else {
                res.send({
                    status : 'success',
                    respon : result
                })
            }
        }
    }


    module.exports = {
        index,
        view,
        store,
        update,
        destroy
    }