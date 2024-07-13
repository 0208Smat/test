import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

var users = [
  {
    "username": "Juanito",
    "email": "juanito@gmail.com",
    "password": "12345"
  },
  {
    "username": "Pepito",
    "email": "pepito@gmail.com",
    "password": "12345"
  }
];

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(req.body.street + req.body.pet + "&#128525;");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  if(!validateLoginBodyOk(req)){
    res.sendStatus(400);
    return;
  }

  let user = users.find(user => user.username === req.body.username);
  if(user && user.password == req.body.password){
    res.json(user);
  }else{
    res.sendStatus(401);
  }
});

app.post("/register", (req, res) => {
  console.log(req.body);
  let user = credencialsMap.get(req.body.username);
  if(user && user.password == req.body.password){
    res.json(credencialsMap.get(req.body.username));
  }else{
    res.sendStatus(401);
  }
});

function validateLoginBodyOk(req){
  if(!req.body || isBlank(req.body.username) || isBlank(req.body.password)){
    return false;
  }else{
    return true;
  }
}

function isBlank(string){
  var result;
  if(!string || string === null || string === ""){
    result = true;
  }else{
    result = false;
  }
  console.log("is blank: "+string+ ":" + result);
  return result;
}