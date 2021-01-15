//mongoDBのコード記述。サーバー側ではあるが、わかりやすいよう区分する。

const mongoose = require('mongoose');

const connect = ()=>{
    mongoose.connect('mongodb://localhost/user');
}

//スキーマ定義
const Schema = mongoose.Schema
const Score = new Schema({
    name: String,
    score: Number
});

//外部から取得するexports
module.exports ={
    connect,
    Score:mongoose.model('Score', Score)
}