const express = require("express");
// const mongoose = require('mongoose');
const router = new express.Router();
const Product = require("../models/products.js");

//CREATE
router.post("/add_Product", (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
//RETRIEVE ALL
router.get("/products", (req, res) => {
  const productInfo = new Product(req.body);
  Product.find({}).then((productInfo) => {
    res.send(productInfo);
  });
});

//RETRIEVE BY ID
// router.get('/products/:id', (req, res) => {
//     const productId = new Product(req.body);
//     Product.findById(req.params.id).then((productId) =>  {
//         const html = '
//         <h1> Users </h1>
//         <p>Manufacturer: ${product.manufacturer}</p>
//         <p>Model: ${product.model}</p>
//         <p>Price: ${product.price}</p>
//       ';

//     res.send(html);
//         // res.send(productId);
//     });

// });
router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const trimmed_id = id.trim();
  Product.findById(trimmed_id)
    .then((product) => {
      if (!product) {
        return res.status(404).send("Product not found");
      }

      const productDetails = `
      <style>
      h3 {
        font-size: 16px;
      }
      p {
        font-size: 12px;
      }
    </style>
        <h3>Product</h3>
        <p>Manufacturer: ${product.manufacturer}</p>
        <p>Model: ${product.model}</p>
        <p>Price: ${product.price}</p>
      `;

      res.send(productDetails);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while retrieving the product");
    });
});

//UPDATE
router.put("/productsUpdate/:id", (req, res) => {
  const id = req.params.id;
  const trimmed_id = id.trim();
  const data = {
    manufacturer: req.body.items,
    model: req.body.items,
    price: req.body.items,
  };
  // save the user
  Product.findByIdAndUpdate(trimmed_id, data, { new: true }).then((product) => {
    res.send(product);
  });
});

//DELETE
router.delete("/productsDelete/:id", (req, res) => {
  const id = req.params.id;
  const trimmed_id = id.trim();
  Product.findByIdAndDelete(trimmed_id)
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
