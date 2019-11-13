const express = require('express');
const mysql = require('mysql');
const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
    // database: "company"
});
db.connect(err => {
    if (err) {
      throw err;
      console.log("Connection error => ", err);
    }
    console.log("Mysql server connected...");
});
app.get("/createdb",(req,res)=>{
let sql = "CREATE DATABASE NTEST";
db.query(sql,(err,result) => {
    if (err){
        throw err;
        console.log("error");
    }
    res.send("DATABASE create");
     

});

});

app.get("/",(req,res)=>{
// console.log(req);
res.send("server running");
});






app.listen("3000",() => console.log("server runing"));
