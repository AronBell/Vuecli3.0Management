const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// const cors = require('cors')
const app = express();

// 数据库链接
const db = require("./db/index").mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('数据库已连接'))
    .catch(err => console.log(err));


// passport初始化
app.use(passport.initialize());
require("./db/passport")(passport);


// 引入users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");


// 使用中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);

app.get("/",(req,res) => {
    res.send("hello world!")
})

const port = process.env.POTR || 5000;

app.listen(port, () => {
    console.log(`port runing on ${port}`)
})


