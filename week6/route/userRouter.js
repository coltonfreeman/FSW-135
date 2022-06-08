const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')

//get all
userRouter.get('/GetAll',function(req, res) {
    User.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  userRouter.post('/Post',function(req, res) {
      const newItem = new User(req.body)
      newItem.save((err, savedItem) =>{

      if (err) {
        res.send(err);
      } else {
        res.send(savedItem);
      }
    });
  });

  userRouter.put('/Update/:id',function(req, res) {
    User.findOneAndUpdate({id:req.params.id},req.body,{new:true},(err,updateditem) => {
    if (err) {
      res.send(err);
    } else {
      res.send(updateditem);
    }
  });
});

userRouter.delete('/Delete/:id',function(req, res) {
    User.findOneAndDelete(
        {id: req.params.id}, 
        (err, deletedItem) => {
          if(err){
            res.status(500)
            return next(err)
          }
          return res.status(200).send(`Successfully deleted item ${deletedItem.body} from the database`)
        }
      )
    
  });

  module.exports = userRouter;