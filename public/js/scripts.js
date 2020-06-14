var socket = io();

function addLetter() {
  $("#m").val("");
  socket.emit("chat message", event.key);
}

socket.on("chat message", function (msg) {
  $("#messages").empty();
  for (i = 0; i < 10; i++) {
    $("#messages").append(msg.substr(i * 10, 10));
    if (i < 10 - 1) {
      $("#messages").append("<br>");
    }
  }
});

socket.on("currently online", function (msg) {
  $("#curOnline").html(msg);
});

function empty() {
  $("#m").val("");
}
