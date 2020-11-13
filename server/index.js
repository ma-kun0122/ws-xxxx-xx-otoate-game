//https://qiita.com/s_harada/items/0dedf1159a25b166730d

// expressフレームワーク
const express = require('express');
const app = express();


//以下、Node.jsからMongoDBにアクセスするためのライブラリMongoose

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('');//function.js参照？

mongoose.connect('mongodb://localhost/user');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Web API create-userの設定
app.post('/api/v1/create-user', (req, res) =>{
    if (!req.body){
        return res.status(500).send('reqest body empty.');
    }

    const instance = new User();
    instance.name = req.body.name;
    instance.age = req.body.age;
    // MongoDBに保存
    instance.save(function(err){
        if(!err) {
            return res.status(200).send('user create success.');
        } else {
            return res.status(500).send('user create failed.');
        }
    });
});

// イベント待機
app.listen(2000, () => console.log('Listening on port 2000'));
