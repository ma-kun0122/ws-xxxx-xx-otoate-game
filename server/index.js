//サーバー側JS

//諸々ここで定義



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const  { connect, Score } = require('./models')

connect()

//CORSを許可する(どのURLからでもアクセスできるための設定)
app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//以下でAPI：scoresの設定
//GETリクエスト
app.get('/api/v1/scores',(req,res) =>{
    //データを取得する処理を書く
    Score.find( {}, null, {sort: {score: -1}}, function(err, result){
        if(!err) {
            return res.json(result);
        } else {
            return res.status(500).send('get all user faild.');
        }
    });
});
//sortの部分参照記事：https://medium.com/@jeanjacquesbagui/in-mongoose-sort-by-date-node-js-4dfcba254110

//POSTリクエスト
app.post('/api/v1/scores', function (req, res) {
    if (!req.body){
        return res.status(500).send('request body empty.');
    }

    const instance = new Score();
    instance.name = req.body.name;
    instance.score = req.body.score;
    

    // MongoDBに保存
    instance.save(function(err,result){
        if(!err) {
            return res.json(result) ;
            
        } else {
            return res.status(500).send('user create faild.');
        }
    });
  })




// イベント待機(どのポートで待ち受けるか)
app.listen(3300, () => console.log('Listening on port 3300'));
