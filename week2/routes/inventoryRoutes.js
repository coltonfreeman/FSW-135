const express = require('express');
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory');

//get all
inventoryRouter.get('/', (req, res, next) => {
    Inventory.find((err, inventories) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(inventories);
    })
});

//get one
inventoryRouter.get('/:inventoryID', (req, res, next) => {
    Inventory.findOne({_id: req.params.inventoryID}, (err, inventoryOne) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(inventoryOne)
    })
});

//post one
inventoryRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body);
    newInventory.save((err, savedInventory) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
});

//delete one
inventoryRouter.delete("/:inventoryID", (req, res, next) => {
    Inventory.findOneAndDelete({_id: req.params.inventoryID}, (err, deletedInventory) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted inventory ${deletedInventory.title} from the database.`);
    })
});

//update one
inventoryRouter.put("/:inventoryID", (req, res, next) => {
    Inventory.findOneAndUpdate(
        {_id: req.params.inventoryID},
        req.body,
        {new: true},
        (err, updatedInventory) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedInventory)
        }
    )
});

module.exports = inventoryRouter;