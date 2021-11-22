const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/',async (req,res)=>{
    let listMARCA = await pool.query('SELECT* FROM MARCA');
    res.json({
        status : 200,
        message: "se ha listado correctamente",
        listMARCA: listMARCA
    });
});
router.get('/:id',async (req,res)=>{
    const {id}= req.params;
    let listMARCA = await pool.query('SELECT * FROM MARCA where id = ?',[id]);
    res.json({
        status : 200,
        message: "se ha obtenido correctamente",
        listMARCA: listMARCA
    });
});
router.post('/create',(req,res)=>{
    const {id,nombre } = req.body;
    const MARCA ={
        id,nombre
    };
    pool.query('Insert into MARCA set ?',[MARCA]);
    res.json({
        status : 200,
        message: "se ha creado correctamente",
        MARCA : MARCA
    });
});
router.post('/update/:id',(req,res)=>{
const {idm}=req.params;
const {id,nombre} = req.body;
const MARCA ={
    id,nombre
};
pool.query('update products set ? where id= ?',[MARCA,idm ]);
res.json({
    status : 200,
    message: "se ha actualizado correctamente",
    MARCA : MARCA
});
});
router.post('/delete/:id',async (req,res)=>{
    const {id}=req.params;
    await pool.query('DELETE FROM marca where id = ?',[id]);
    res.json({
        status : 200,
        message: "se ha eliminado correctamente",
        
    });
});
module.exports = router;


