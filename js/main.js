$(document).ready(function() {

    $("#startscreen").click(function() {
        $(this).fadeOut(200);
    });

    $(".button").click(function() {
        $(this).fadeOut(10);

    });
var Sound = new Audio("click.mp3");
document.getElementById("camerasound").addEventListener("click", e => Sound.play());
/*
$("#yes").click(function() {
        document.getElementById("yes").style.textDecoration = "line-through";
    });






*/});