const express = require("express");
// const mongoose = require('mongoose');
const router = new express.Router();
const Order = require("../models/orders.js");

//CREATE
router.post("/add_Order", (req, res) => {
  const order = new Order(req.body);
  order
    .save()
    .then((order) => {
      res.status(201).send(order);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
//RETRIEVE ALL
router.get("/orders", (req, res) => {
  const orderInfo = new Order(req.body);
  Order.find({}).then((orderInfo) => {
    res.send(orderInfo);
  });
});

//RETRIEVE BY ID
// router.get("/orders/:id", (req, res) => {
//   const id = req.params.id;
//   // const orderId = new Order(req.body);
//   const trimmed_id = id.trim();
//   Order.findById(trimmed_id)
//     .then((order) => {
//       const orderDetails = `
//         <h3>Orders</h3>
//         <p>Items: ${order.items}</p>

//       `;
//       res.send(orderDetails);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("An error occurred while retrieving the order");
//     });
// });

router.get("/orders/:id", (req, res) => {
  const orderid = req.params.id;
  const trim_id = orderid.trim();
  Order.findById(trim_id)
    .then((order) => {
      if (!order) {
        return res.status(404).send("Order not found");
      }
      const orderDetails = `
      <style>
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
    }
  </style>
          <h3>Orders</h3>
          <p>Items: ${order.items}</p>
        `;
      res.send(orderDetails);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while retrieving the order");
    });
});

//UPDATE
router.put("/ordersUpdate/:id", (req, res) => {
  //const id = req.params.id;
  const orderid = req.params.id;
  const trim_id = orderid.trim();
  const data = {
    items: req.body.items,
  };
  // save the user
  Order.findByIdAndUpdate(trim_id, data, { new: true }).then((order) => {
    res.send(order);
  });
});

//DELETE
router.delete("/ordersDelete/:id", (req, res) => {
  const orderID = req.params.id;
  const trim_id = orderID.trim();

  Order.findByIdAndDelete(trim_id)
    .then((order) => {
      res.status(201).send(order);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
