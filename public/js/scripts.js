var socket = io();

function addLetter() {
  $("#m").val("");
  socket.emit("chat message", event.key);
}

socket.on("chat message", function (characters, totalTyped) {
  $("#messages").empty();
  for (i = 0; i < 10; i++) {
    $("#messages").append(characters.substr(i * 10, 10));
    if (i < 10 - 1) {
      $("#messages").append("<br>");
    }
    $("#totalTyped").html(totalTyped);
  }
});

socket.on("currently online", function (msg) {
  $("#curOnline").html(msg);
});

function empty() {
  $("#m").val("");
}
