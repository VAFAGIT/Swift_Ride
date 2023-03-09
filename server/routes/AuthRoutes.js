const express = require("express");
const router = express();
const { CreateUser, Login , getUsers} = require("../controllers/AuthController");

router.post("/", Login);
router.get("/users", getUsers)
router.post("/register", CreateUser);




module.exports =  router ;

