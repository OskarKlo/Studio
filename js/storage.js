var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var artistName = document.getElementById('inputArtist');
var artLocation = document.getElementById('inputLocation');
var uploadInfo = document.getElementById('uploadImg');
// const uploadBtn = document.getElementById('uploadInfo');
// var artDate = document.getElementById('inputDate');
// var uploadBtn = document.getElementById('uploadImg');
var downUrl;

fileButton.addEventListener('change', e=> {
    var file = e.target.files[0];
    var storageRef = storage.ref('photos/' + file.name);
    var uploadTask = storageRef.put(file);
    uploadTask.on('state_changed', 
         function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err) {
            console.log('uploadTask error')
        },
        function complete() {
            console.log('complete');
            storageRef.getDownloadURL().then(function (url) {
                downUrl = url;
                document.getElementById('photoBox').classList.remove('hide');
                document.getElementById('photoBox').src = downUrl;
                console.log("Image Loaded");
            }).catch(function(error) {
                console.log("error showing image in photoBox");
            })
            //Call the function to add the Artist Info
        })
});

uploadInfo.addEventListener('click', e => {
    artistName = artistName.value;
    artLocation = artLocation.value;
    postsRef = database.ref().child('users').child(uid).child('posts');
    var uniqueId = makeid();
    var currentTime = getTime();
    var artistInfo = {
        artist: artistName,
        location: artLocation,
        downloadUrl: downUrl,
        like_count: 0,
        id: "empty",
        date: currentTime
    }
    var key = postsRef.push(artistInfo).key;
    // postsRef.child(key).set(artistInfo);
    // console.log(key);
    idPostRef = database.ref().child('users').child(uid).child('posts').child(key);
    idPostRef.update({id: key});
    // alert('Uploaded Successfuly');
    showAlertSus();
}).catch(function(error) {
    console.log('Error, image not loaded fully.');
    alert('Wait for the image to load fully.');
})

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// var likeCountRef = firebase.database().ref().child('users').child(uid).child('posts').orderByChild('like_count');

// uploadBtn.addEventListener('click', function() {
//     auth.onAuthStateChanged(function (user) {
//         var uid = user.uid;
//         var artist = artistName.value;
//         var date = artDate.value;
//         var databaseRef = database.ref().child('users').child(uid).child('posts');
//         var information = {
//             email: user.email,
//             uid: uid,
//             url: downUrl,
//             artist: artist,
//             date: date
//         }
//         databaseRef.push(information);
//     }) 
// })


