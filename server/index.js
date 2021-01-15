//サーバー側JS

//諸々ここで定義



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// イベント待機
app.listen(3300, () => console.log('Listening on port 3300'));



const  { connect, Score } = require('./models')

connect()

//CORSを許可する(どのURLからでもアクセスできるための設定)
app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });






//ここでAPI：scoresの設定(ここでGETリクエストを受ける)

app.get('/api/v1/scores',function(req,res) {
    //データを取得する処理を書く
    //仮に4人の結果を入れておく
    const scores = [
        {name: "aaa",score: 100},
        {name: "bbb",score: 200},
        {name: "ccc",score: 300},
        {name: "ddd",score: 400},
    ];
    res.json(scores);
})



/*app.get('/api/v1/scores',(req,res) =>{
    //データを取得する処理を書く
    Score.find({}, function(err, result){
        if(err){
            return res.status(400).json({ error: 'error'})
    }
    return res.json(result)
   })
})
*/

// API：create-scores(最終結果。プレイヤー名と最終スコア)の設定(ここでPOSTリクエストを受ける)

app.post('/api/v1/create-scores', function(req, res) {
    console.log("追加成功");
    return res.json({name: "ddd",score: 500});

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
});






//ここでAPI：delete-scoresの設定(ここでDELETEリクエストを受ける)
app.delete('/api/v1/delete-scores', function (req, res) {
    res.send('DELETE request to homepage')
})

/*
スコアのみを取得した場合
app.get('/api/v1/scores',(req,res) =>{
    //データを取得する処理を書く
    Score.find({}, function(err, result){
        if(err){
            return res.status(400).json({ error: 'error'})
    }
    return res.json(result)
   })
})
*/






