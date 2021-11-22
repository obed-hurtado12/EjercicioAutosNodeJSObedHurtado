const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/',async (req,res)=>{
    let listMarca = await pool.query('SELECT * FROM agencia.autos inner join agencia.marca where marca.id=autos.marca;');
    res.json({
        status : 200,
        message: "se ha listado correctamente",
        listMarca: listMarca
    });
});
router.get('/:id',async (req,res)=>{
    const {id}= req.params;
    let listMarca = await pool.query('SELECT * FROM agencia.autos inner join agencia.marca where marca.id=autos.marca and id = ?',[id]);
    res.json({
        status : 200,
        message: "se ha obtenido correctamente",
        listMarca: listMarca
    });
});
router.post('/createauto',(req,res)=>{
    const {idA, NombreA, Matrícula, Año_de_verificación, Fecha_de_registro, Fecha_de_actualización, Estado, Marca, idM, nombreM} = req.body;
    const AUTO ={
        idA, NombreA, Matrícula, Año_de_verificación, Fecha_de_registro, Fecha_de_actualización, Estado, Marca, id, nombre
    };
    const MARCA ={
        idM, nombreM
    };
    pool.query('Insert into MARCA set ?,Insert into AUTOS set ?',[MARCA,AUTO]);
    res.json({
        status : 200,
        message: "se ha creado correctamente",
        agencia : agencia
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


