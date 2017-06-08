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

$('.trial').css('color', 'white');

$.get('/data.json', function (data) {
    console.log("IT worked");
}).fail(function () {
    console.log("IT failed");
});

$.post('index.html', { username: 'tom' }, function (data) {
    console.log(data);
}).fail(function () {
    console.log('another fail');
});

// When Window Loads
// var alertAQuestion = function (event) {
//     console.log("Window loaded!");
// };

// $(window).ready(alertAQuestion);

// $(alertAQuestion);

