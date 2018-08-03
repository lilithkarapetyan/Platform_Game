var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var cnv = document.getElementById('defaultCanvas0');
var h1 = document.getElementById("message")

span.onclick = function () {
    modal.style.display = "none";
}

function check() {
    if (playerWon && !informed) {
        modal.style.display = "block";
        informed = true;
    }
}