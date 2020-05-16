const moduleName = "Items.js";

const path = require("path");
const config = require(path.join(__base, "config/config"));

// Item Model
const Item = require(path.join(__base, "models/Item"));

// GetItems
const getItems = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
};
exports.getItems = getItems;

// GetItem
const getItem = (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
};
exports.getItem = getItem;

// PostItem
const postItem = (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then((item) => res.json(item));
};
exports.postItem = postItem;

// DeleteItem
const deleteItem = (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
};
exports.deleteItem = deleteItem;
