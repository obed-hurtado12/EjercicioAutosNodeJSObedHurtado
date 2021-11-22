const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/',async (req,res)=>{
    let listAUTOS = await pool.query('SELECT* FROM AUTOS');
    res.json({
        status : 200,
        message: "se ha listado correctamente",
        listAUTOS: listAUTOS
    });
});
router.get('/:id',async (req,res)=>{
    const {id}= req.params;
    let listAUTOS = await pool.query('SELECT * FROM AUTOS where id = ?',[id]);
    res.json({
        status : 200,
        message: "se ha obtenido correctamente",
        listAUTOS: listAUTOS
    });
});
router.post('/create',(req,res)=>{
    const {name,price } = req.body;
    const AUTOS ={
        name,price,status:1
    };
    pool.query('Insert into AUTOS set ?',[AUTOS]);
    res.json({
        status : 200,
        message: "se ha creado correctamente",
        AUTOS : AUTOS
    });
});
router.post('/update/:id',(req,res)=>{
const {id}=req.params;
const {name,price} = req.body;
const AUTOS ={
    name,price,status:1
};
pool.query('update products set ? where id= ?',[AUTOS,id ]);
res.json({
    status : 200,
    message: "se ha actualizado correctamente",
    AUTOS : AUTOS
});
});
router.post('/delete/:id',async (req,res)=>{
    const {id}=req.params;
    await pool.query('update products set status = 0 where id = ?',[id]);
    res.json({
        status : 200,
        message: "se ha eliminado correctamente",
        
    });
});
module.exports = router;


