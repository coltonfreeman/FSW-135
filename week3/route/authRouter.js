const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//get-all Users
authRouter.get("/users", (req, res, next) => {
    User.find((err, users) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users);
    })
})

//User-Signup 
authRouter.post("/signup", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(user) {
            res.status(403)
            return next(new Error("That username is already taken!"))

        }
        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(), secret);
            return res.status(201).send({token, user: savedUser});
        })
    })
})

//User-Login
authRouter.post("/login", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(!user) {
            res.status(403)
            return next(new Error("User does not exist!"))
        }
        if(req.body.password !== user.password) {
            res.status(403)
            return next(new Error("Username or Password are incorrect!"))
        }
        const token = jwt.sign(user.toObject(), `${process.env.JWT_SECRET_KEY}`);
        return res.status(200).send({token, user});
    })
})

//get one
authRouter.get('/:userID', (req, res, next) => {
    User.find({_id: req.params.userID}, (err, user) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(user);
    })
});

//update-one User
authRouter.put("/:userID", (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userID},
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedUser)
        }
    )
});

//delete-one User
authRouter.delete("/:userID", (req, res, next) => {
    User.findOneAndDelete({_id: req.params.userID}, (err, deletedUser) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted User ${deletedUser.username} from the database.`);
    })
});

module.exports = authRouter;