const router = require('express').Router()
const { google } = require("googleapis");

const Donor = require('../models/donor')
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })


router.post('/login', async(req,res)=> {

    try {
        if(req.body.user.trim()!=='bbms') {
            console.log('- Incorrect User')
            res.status(401) .send('Incorrect User')
        }else {
            if(req.body.password.trim()!=='admin') {
                console.log('- Incorrect password')
                res.status(401).send('Incorrect password')
            }else {      
                res.send('Logged In') 
                }
        } }
    catch (err) {
        console.log(err)
    }
})

router.post('/addDonor', async(req,res)=> {
    console.log(req.body)
    const newDonor = new Donor({
        name: req.body.name,
        location: req.body.location,
        age: req.body.age,
        bloodtype: req.body.bloodtype
    })

    const donor = await newDonor.save()
    res.send(donor);
})

router.post('/deleteDonor', async(req,res)=> {
    const firstDonor = await Donor.findOne()

    let deletedElem = await Donor.findOne({
        name:  req.body.name
    })
    
    let deleted = await Donor.deleteOne({
        name:  req.body.name
    })
    console.log(JSON.stringify(deletedElem))
    console.log(JSON.stringify(firstDonor))

    if(JSON.stringify(deletedElem)===JSON.stringify(firstDonor)){
        let fDon = await Donor.findOne()

        console.log(fDon)
        await Donor.findOneAndUpdate({name:fDon.name}, {stock:firstDonor.stock})
    }

    res.send('done')
})


router.post('/changeStock', async(req,res)=> {
    const firstDonor = await Donor.findOne()
    const stock = firstDonor.stock;
    firstDonor.stock = req.body.stock;
    await firstDonor.save();
    res.send(req.body.stock)
})


router.post('/getDonors', async(req,res)=> {
    const allDonors = await Donor.find()
    res.send(allDonors)
})





module.exports = router
