// const socket = io.connect("https://suml.xyz:3000");
const socket = io.connect("http://localhost:3000");

socket.on("msg", function (data) {
    $("#chatContent").append(`${data}<br>`);
    console.log(data);
});

$("#myChat").on("keyup", function () {
    if (window.event.keyCode == 13) {
        $("#chatContent").append(`Client : "${$(this).val()}" 보냅니다.<br>`);
        socket.emit("msg", $(this).val());
        $(this).val("");
    }
});
