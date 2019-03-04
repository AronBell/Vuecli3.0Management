// login & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const index = require('../../db/index');
const passport = require('passport');
const User = require('../../models/User');



// test测试
router.get('/test',(req,res) => {
    res.json({msg:'login work'});
});


// &api/users/register
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json("邮箱已被注册！")
            } else {
                const avatar = gravatar.url('wy_1947@163.com', { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                               .then(user => res.json(user))
                               .catch(err => console.log(err));
                    });
                });
            }
        })
});

    // 查询数据库中是否拥有邮箱
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json('用户不存在!');
        }

        // 密码匹配
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const rule = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    identity: user.identity
                };
                jwt.sign(rule, index.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                return res.status(400).json('密码错误!');
            }
        });
    });
});


// &get token , get message
// &private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        });
})

module.exports = router;