//@login & regiser
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../models/Profile');

//@route    GET api/profiles/test
//@desc     返回的请求的json数据
//@access   public
router.get('/test', (err, res)=>{
    res.json({msg: 'profile works'});
});


//@route    POST api/profiles/add
//@desc     创建信息接口
//@access   Private
router.post("/add",passport.authenticate("jwt" ,{session:false}), (req, res)=>{
    const profileFields = {};
    
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile => {
        res.json(profile);
    });
});

//@route    GET api/profiles/profiles
//@desc     获取信息接口
//@access   Private
router.get('/',passport.authenticate('jwt',{session:false}), (req, res)=>{
    Profile.find()
            .then(profile => {
                if(!profile){
                    return res.status(404).json("没有任何内容");
                }
                res.json(profile);
            })
            .catch(err => {
                res.status(404).json(err);
            })
});


//@route    POST api/profiles/edit/:id
//@desc     编辑信息接口
//@access   Private
router.post("/edit/:id",passport.authenticate("jwt" ,{session:false}), (req, res)=>{
    const profileFields = {};
    
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id: req.param.id},
        {$set:profileFields},
        {new: true}
    ).then(profile =>{
        res.json(profile);
    })
});


//@route    delete api/profiles/delete/:id
//@desc     删除信息接口
//@access   Private

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    profile.findOneAndRemove({_id:req.params.id}).then(profile => {
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => {
        res.status(404).json("删除失败!");
    })
});




module.exports = router;