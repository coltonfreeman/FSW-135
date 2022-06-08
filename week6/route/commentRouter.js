const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

//get all
commentRouter.get('/GetAll',function(req, res) {
    Comment.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  commentRouter.post('/Post',function(req, res) {
      const newItem = new Comment(req.body)
      newItem.save((err, savedItem) =>{

      if (err) {
        res.send(err);
      } else {
        res.send(savedItem);
      }
    });
  });

  commentRouter.put('/:id',function(req, res) {
    Comment.findOneAndUpdate({id:req.params.id},req.body,{new:true},(err,updateditem) => {
    if (err) {
      res.send(err);
    } else {
      res.send(updateditem);
    }
  });
});

commentRouter.delete('/Delete/:id',function(req, res) {
    Comment.findOneAndDelete(
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

  module.exports = commentRouter;