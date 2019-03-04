const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');



// router.get("/test", (req,res) =>{
//     res.send("profile test")
// })

// 创建信息接口
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const profileFields = {};

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expend) profileFields.expend = req.body.expend;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;

        new Profile(profileFields).save().then(profile => {
            res.json(profile);
        });
    }
);

// 获取所有信息
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    profile.find()
           .then(profile =>{
               if(!profile) {
                   return res.status(404).json("没有任何内容！")
               }
               res.json(profile);
           })
           .catch(err => res.status(404).json(err));

})


// 获取单个id
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    profile.findOne({_id:req.params.id})
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容！")
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));

})



// 编辑
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = {};

    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.incode) profileFields.incode = req.body.incode;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set:profileFields},
        {new: true}
    ).then(profile => res.json(profile))
})

// 删除
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOneAndRemove({_id: req.params.id}).then(profile => {
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json("删除失败！"))

})


module.exports = router;

