const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));

let characters = "_";
characters = characters.repeat(100);

let curOnline = 0;
let totalTyped = 0;

let re = /^[a-zA-Z_ ]+$/;

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  io.emit("chat message", characters, totalTyped);
  curOnline++;
  io.emit("currently online", curOnline);
  socket.on("disconnect", () => {
    curOnline--;
    io.emit("currently online", curOnline);
  });
  socket.on("chat message", (msg) => {
    if (msg.length == 1 && re.test(msg)) {
      msg = msg == " " ? "_" : msg.toUpperCase();
      characters += msg;
      totalTyped++;
      if (characters.length > 100) characters = characters.substr(1);
      io.emit("chat message", characters, totalTyped);
    }
  });
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
