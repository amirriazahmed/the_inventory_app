var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Product = require("../models/ProductSchema");

/* List all products. */
router.get("/", async (req, res, next) => {
  let data = await Product.find({});
  console.info(`records retrieved from mongoose:`, data.length);
  res.send(data);
});

// Find a product by a field
router.post("/findbyfield", async (req, res, next) => {
  let data = await Product.find(req.body);
  console.info(`records retrieved from mongoose:`, data.length);
  res.send(data);
});

// Big Search a product by field
router.post("/bigsearch", async (req, res, next) => {
  const { page, limit,search} = req.body;  
  console.log("Search:", search)
  let data = await Product.find(search)
  .limit(limit * 1)
  .skip((page) * limit)
  .exec();   
  console.info(`records retrieved from mongoose:`, data.length);
  res.send(data);
 });

//Add Product

router.put("/add", async (req, res, next) => {
  let data = await Product.find({ id: req.body.id });
  console.info(`records retrieved from mongoose:`, data.length);
  if (data.length > 0) {
    res.sendStatus(400);
  } else {
    data = await Product.create(req.body);
    res.send(data);
  }
});

//Overide Quantity not being used, was in version 1 

router.patch("/changequantity", async (req, res, next) => {
  let originalDocument = await Product.find({ id: req.body.id });
  console.info(`records retrieved from mongoose:`, originalDocument.length);
  if (originalDocument.length === 0) {
    res.sendStatus(400);
  } else {
    let updateResult = await Product.updateOne(
      { _id: originalDocument[0]._id },
      { $set: { quantity: req.body.quantity } }
    );

    if (updateResult.nModified === 1) {
      let data = await Product.findOne({ _id: originalDocument[0]._id });
      res.send(data);
    } else {
      res.sendStatus(400);
    }
  }
});
//Adjust quantity whether receiving or issuing
router.patch("/changequantity/:_id", async (req, res, next) => {
  console.log(req.params._id);
  let originalDocument = await Product.findOne({ _id: req.params._id });
  console.log(originalDocument);
  if (originalDocument.id) {
    
    let newQuantity = originalDocument.quantity + req.body.updateQuantityBy;
    console.log(newQuantity);
    let updateResult = await Product.updateOne(
      { _id:req.params._id },
      { $set: { quantity: newQuantity } }
    );

    if (updateResult.nModified === 1) {
      let data = await Product.findOne({ _id: originalDocument._id });
      res.send(data);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
   
  }
});

//delete a record collection 1
router.delete("/delete/:_id", async (req, res, next) => { 
  
  try {
         data = await Product.deleteOne({_id:req.params._id});
    res.send(data); 
  } 
  catch {
         res.sendStatus (400);
  }    
  });

//delete a record collection 2
/* router.delete("/delete/:id", async (req, res, next) => {
  let data = await Product.find({ id: reg.body.id });
  console.info(`records retrieved from mongoose:`, data.length);
  
    if (data.length > 0) {
      data = await Product.deleteOne({_id:data[0]._id});
    res.send(data);
     
    } else {
      res.sendStatus(400);
    }
  }); */

  
router.get("/:superheroid", async (req, res, next) => {
  let superheroid = req.params.superheroid;
  console.info("We should be looking up superhero ", superheroid);

  try {
    let data = await Superhero.findById(superheroid);
    console.info("findById returned: " + data);
    if (data === null) {
      throw new Error("Superhero not found");
    }
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
