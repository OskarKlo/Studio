var storageRef = firebase.storage();
var auth = firebase.auth();
var database = firebase.database();

const imgBox = document.getElementById('post-id');

var uid = "";

auth.onAuthStateChanged(function (user) {
    uid = user.uid;
});

function loadImg(uid) {
    var userDbRef = database.ref().child('users').child(uid);
    var userPostsDbRef = userDbRef.child('posts');
    console.log(userPostsDbRef.numChildren());
    var urlRef = userPostsDbRef.child().child('information').child('url');
    var downloadUrl = urlRef.value;
    // get storageRef for download Url and then

    // 

    
}