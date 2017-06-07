// Sample Working Button by ID
var handleClick = function (event) {
    alert("it was clicked");
};
var button = document.getElementById('trial-button');
button.addEventListener('click', handleClick);

// var req = new XMLHttpRequest();
// req.onload = function (event) { . . . };
// req.open('get', 'some-file.txt', true);
// req.send();