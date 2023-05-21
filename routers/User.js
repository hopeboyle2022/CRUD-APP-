const express = require("express");
// const mongoose = require('mongoose');
const router = new express.Router();
const User = require("../models/User.js");

//CREATE
router.post("/add_user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
//RETRIEVE ALL
router.get("/users", (req, res) => {
  const userInfo = new User(req.body);
  User.find({}).then((userInfo) => {
    res.send(userInfo);
  });
});

//RETRIEVE BY ID
router.get("/users/:id", (req, res) => {
  //   const userId = new User(req.body);
  //   User.findById(req.params.id).then((userId) => {
  //     res.send(userId);

  const userid = req.params.id;
  const trim_id = userid.trim();
  User.findById(trim_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      const userDetails = `
      <style>
      h3 {
        font-size: 16px;
      }
      p {
        font-size: 12px;
      }
    </style>
          <h3>Users</h3>
          <p>Title: ${user.title}</p>
          <p>Forename: ${user.fname}</p>
          <p>Surname: ${user.surname}</p>
          <p>Mobile: ${user.mobile}</p>
          <p>Email: ${user.email}</p>
        `;
      res.send(userDetails);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while retrieving the User");
    });
});

//UPDATE
router.put("/usersUpdate/:id", (req, res) => {
  //const id = req.params.id;
  const userid = req.params.id;
  const trim_id = userid.trim();
  const data = {
    title: req.body.title,
    fname: req.body.fname,
    surname: req.body.surname,
    mobile: req.body.mobile,
    email: req.body.email,
  };
  // save the user
  User.findByIdAndUpdate(trim_id, data, { new: true }).then((user) => {
    res.send(user);
  });
});

//DELETE
// router.delete("/usersDelete/:id", (req, res) => {
//   //onst userID = req.params.id;
//   const userid = req.params.id;
//   const trim_id = userid.trim();
//   User.findByIdAndDelete(trim_id)
//     .then((user) => {
//       res.status(201).send(user);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

router.delete("/usersDelete/:id", (req, res) => {
  const userId = req.params.id;
  const trim_id = userId.trim();
  User.findByIdAndDelete(trim_id)
    .then(() => res.send("User deleted successfully"))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
