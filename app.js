const express = require("express");
const mysql = require("mysql");

// Connection settings

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "company"
});

db.connect(err => {
  if (err) {
    throw err;
    console.log("Connection error => ", err);
  }
  console.log("Mysql server connected...");
});

const app = express();

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE blog";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Database creted");
  });
});

app.get("/createposttable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), prev VARCHAR(128), single_post VARCHAR(255), author VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
      if(err){
          throw err;
          console.log(err);
      }
    console.log(result);
    res.send("Table created...");
  });
});

app.get("/addpost", (req, res) => {
  let post = {
    title: "First post",
    prev: "Start post",
    single_post: "This is a full post",
    author: "Bart Simpson"
  };

  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log("Insert post result => ", result);
    res.send("Post added...");
  });
});

app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("SELECT posts result => ", results);
    res.send("Posts fatched...");
  });
});

app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("SELECT posts result => ", results);
    res.send("Post fatched...");
  });
});

app.get("/updatepost/:id", (req, res) => {
  let newTitle = "After update!";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Issue =>", err);

    console.log("UPDATE posts result => ", result);
    res.send("UPDATE ...");
  });
});

app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Issue =>", err);

    console.log("Delete posts result => ", result);
    res.send("Delete ...");
  });
});

app.get("/task1",(req,res)=>{
let sql = "SELECT * FROM customers;";
db.query(sql,(err,result)=>{
if(err){
    throw err;
    console.log(err);
}
res.send(result);
});
});

app.get("/task2",(req,res)=>{
let sql = "SELECT * FROM orders WHERE odate ='1990-03-10' ORDER BY amt ASC;";
db.query(sql,(err,result)=>{
if(err){
    throw err;
    console.log(result);
}
res.send(result);
});
});

app.get("/task3",(req,res)=>{
    let sql = "SELECT * FROM orders ORDER BY odate DESC LIMIT 2;";
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
            console.log(err);
        }
        res.send(result);
    });

});

app.get("/task4",(req,res)=>{
let sql = "SELECT c.cname, c.rating, c.city, s.sname FROM customers c, salers s WHERE c.snum = s.snum AND c.rating >= 200;";
db.query(sql,(err,result)=>{
if(err){
    throw err;
    console.log(err);
}
res.send(result);
});
});

app.get("/task5",(req,res)=>{
    let sql = "SELECT 'Продавец: ', sname, 'Сумма продажи: ', amt, 'Размер комиссионных: ', (amt*comm) AS res FROM salers, orders WHERE salers.snum = orders.snum;";
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
            console.log(err);
        }
        res.send(result);
    })
})

app.get("/task6",(req,res)=>{
let sql = "SELECT sname, CHAR_LENGTH(sname) FROM salers WHERE CHAR_LENGTH(sname) >= 6;";
db.query(sql,(err,result)=>{
    if(err){
        throw err;
        console.log(err);
    }
    res.send(result);
})
});

app.get("/task7",(req,res)=>{
let sql ="SELECT onum, amt, REPLACE(odate, '-', '/') AS odate, cnum, snum FROM orders;";
db.query(sql,(err,result)=>{
    if(err){
        throw err;
        console.log(result);
    }
    res.send(result);
});
});

app.get("/task8",(req,res)=>{
    let sql = "SELECT amt, SUBSTRING_INDEX(amt, '.', 1) AS amt FROM orders;";
    db.query(sql,(err,result)=>{
        if(err){
          throw err;
        console.log(result);  
        }
        res.send(result);
    });
});

app.get("/task9",(req,res)=>{
let sql ="SELECT SUBSTRING_INDEX(REPLACE(odate, '-', '/'), '/', -2) AS odate FROM orders;";
db.query(sql,(err,result)=>{
if(err){
    throw err;
    console.log(err);
}
res.send(result);
});
});


app.get("/task10",(req,res)=>{
    let sql = "SELECT * FROM salers WHERE CHAR_LENGTH(sname) <> LENGTH(sname);";
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
            console.log(err);
        }
        res.send(result);
    })
})

app.listen("3000", () => {
  console.log("Server running...");
});