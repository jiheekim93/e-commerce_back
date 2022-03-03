const express = require('express')
const router = express.Router()
const Groceries = require('../models/grocery.js')

router.get('/', (req, res) => {
  Groceries.find({}, (err, foundReviews)=>{
      res.json(foundReviews);
  });
})

router.post('/', (req, res) => {
  Groceries.create(req.body, (err, createdReviews) => {
      res.json(createdReviews)
  })
})

router.delete('/:id', (req, res)=>{
    Groceries.findByIdAndRemove(req.params.id, (err, deletedReviews)=>{
        res.json(deletedReviews);
    });
});

router.put('/:id', (req, res)=>{
    Groceries.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedReviews)=>{
        res.json(updatedReviews);
    });
});


module.exports = router
