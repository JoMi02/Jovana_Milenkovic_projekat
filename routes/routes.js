const express = require('express');
// const { Model } = require('mongoose');
const Model = require("../model/model");
const router = express.Router();

router.post('/post', async(req,res) =>{
    const data = new Model({
        ime_i_prezime : req.body.ime_i_prezime,
        adresa : req.body.adresa,
        izborni_predmet : req.body.izborni_predmet,
        nastavnik : req.body.nastavnik,
        opisna_ocena : req.body.opisna_ocena
    })
    try{
        console.log(data);
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }catch(error){
        console.log(error);
        res.status(400).json({message: error.message});
    }
})
router.get('/getAll', async(req,res) =>{
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/getOne/:id', async(req,res) =>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.patch('/update/:id', async(req,res) =>{
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        );
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.delete('/delete/:id', async(req,res) =>{
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Odabrani ucenik je obrisan..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    };
})

module.exports = router;