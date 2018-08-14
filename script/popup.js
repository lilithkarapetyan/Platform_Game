var modal = document.getElementById('win');
var startPopUp = document.getElementById('start');
var span = document.getElementsByClassName("close")[0];
var cnv = document.getElementById('defaultCanvas0');
var h1 = document.getElementById("message")
var lvl1 = document.getElementById('lvl1');
var lvl2 = document.getElementById('lvl2');
var lvl3 = document.getElementById('lvl3');
var confirmYes = document.getElementById('yes');
var confirmNo = document.getElementById('no');
var confBox = document.getElementById('delete');
if (!built && !gameStarted) {
    let url = location.href;
    let startIndex = url.indexOf("=") + 1;
    if (startIndex > 0) {
        var inputField = document.getElementById("data")
        base64 = url.slice(startIndex);
        base64 = base64.replace(/%3D/g, "");
        base64 = base64.replace(/=/g, "");
        inputField.value = base64;
        let encoded = window.atob(base64)
        var decoded = decodeURI(encoded);
        if (decoded)
            data = JSON.parse(decoded);
    }
}




span.onclick = function () {
    modal.style.display = "none";
    popup = false;
}

lvl1.onclick = function () {
    startPopUp.style.display = "none";
    popup = false;
    //construct(JTdCJTIyYmxvY2tzJTIyOiU1QiU3QiUyMnglMjI6ODUsJTIyeSUyMjozMTEuODEyNSwlMjJ0eXBlJTIyOiUyMlN0b25lJTIyJTdELCU3QiUyMnglMjI6MTg4LCUyMnklMjI6MjUyLjMxMjUsJTIydHlwZSUyMjolMjJIb3Jpem9udGFsJTIyLCUyMmVkaXRSYW5nZSUyMjoxNTAlN0QsJTdCJTIyeCUyMjozMjAsJTIyeSUyMjoyNjcuMzEyNSwlMjJ0eXBlJTIyOiUyMlZlcnRpY2FsJTIyLCUyMmVkaXRSYW5nZSUyMjo3NSU3RCwlN0IlMjJ4JTIyOjQ4NiwlMjJ5JTIyOjI4Mi44MTI1LCUyMnR5cGUlMjI6JTIyU2FuZCUyMiU3RCwlN0IlMjJ4JTIyOjU2OSwlMjJ5JTIyOjMwNi4zMTI1LCUyMnR5cGUlMjI6JTIyRGVhdGglMjIlN0QsJTdCJTIyeCUyMjo3NjMsJTIyeSUyMjoyODIuODEyNSwlMjJ0eXBlJTIyOiUyMlN0b25lJTIyJTdEJTVELCUyMnBsYXllciUyMjolN0IlMjJ4JTIyOjEwMCwlMjJ5JTIyOjIwMCU3RCwlMjJjb2lucyUyMjolNUIlN0IlMjJ4JTIyOjc5MSwlMjJ5JTIyOjIwMS44MTI1JTdEJTVELCUyMmN1cCUyMjolN0IlMjJ4JTIyOjY1NSwlMjJ5JTIyOjIwMCU3RCwlMjJjYW1lcmElMjI6JTdCJTIyeCUyMjotOTIsJTIyeSUyMjowJTdEJTdE)
}
lvl2.onclick = function () {
    startPopUp.style.display = "none";
    popup = false;
}
lvl3.onclick = function () {
    startPopUp.style.display = "none";
}

if (data) {
    startPopUp.style.display = "none";
    popup = false;
}
function check() {
    if (playerWon && !informed) {
        modal.style.display = "block";
        popup = true;
        informed = true;
    }
}

function confirm() {
    confBox.style.display = "block";
    popup = true;
}

confirmYes.onclick = function () {
    confBox.style.display = "none";
    popup = false;
    deleteEverything();
}
confirmNo.onclick = function () {
    confBox.style.display = "none";
    popup = false;

}