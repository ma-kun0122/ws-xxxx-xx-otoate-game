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
    Score.find(function(err, result){
        if(!err) {
            return res.json(result);
        } else {
            return res.status(500).send('get all user faild.');
        }
    });
});


//POSTリクエスト
app.post('/api/v1/scores', function (req, res) {
    if (!req.body){
        return res.status(500).send('request body empty.');
    }

    const instance = new Score();
    instance.name = req.body.name;
    instance.score = req.body.score;

    // MongoDBに保存
    instance.save(function(err){
        if(!err) {
            return res.status(200).send('user create success.');
        } else {
            return res.status(500).send('user create faild.');
        }
    });
  })



app.delete('/api/v1/scores', function (req, res) {
    Score.delete()
});





// イベント待機(どの番地のポートで待ち受けるか)
app.listen(3300, () => console.log('Listening on port 3300'));
