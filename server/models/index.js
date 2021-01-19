//mongoDBのコード記述。サーバー側ではあるが、わかりやすいよう区分する。


//https://qiita.com/ngmr_mo/items/73cc7160d002a4989416

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

//外部から取得するためexports
module.exports ={
    connect,
    Score:mongoose.model('Score', Score)
}


