var auth = firebase.auth();
var storage = firebase.storage();
var database = firebase.database();

// // Points to the root reference
// var storageRef = firebase.storage().ref();

// // Points to 'images'
// var imagesRef = storageRef.child('images');

// // Points to 'images/space.jpg'
// // Note that you can use variables to create child values
// var fileName = 'space.jpg';
// var spaceRef = imagesRef.child(fileName);

// // File path is 'images/space.jpg'
// var path = spaceRef.fullPath

// // File name is 'space.jpg'
// var name = spaceRef.name

// // Points to 'images'
// var imagesRef = spaceRef.parent;

//

// var uploadTask = storageRef.child('images/rivers.jpg').put(file);

// // Register three observers:
// // 1. 'state_changed' observer, called any time the state changes
// // 2. Error observer, called on failure
// // 3. Completion observer, called on successful completion
// uploadTask.on('state_changed', function(snapshot){
//   // Observe state change events such as progress, pause, and resume
//   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('Upload is ' + progress + '% done');
//   switch (snapshot.state) {
//     case firebase.storage.TaskState.PAUSED: // or 'paused'
//       console.log('Upload is paused');
//       break;
//     case firebase.storage.TaskState.RUNNING: // or 'running'
//       console.log('Upload is running');
//       break;
//   }
// }, function(error) {
//   // Handle unsuccessful uploads
// }, function() {
//   // Handle successful uploads on complete
//   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//   var downloadURL = uploadTask.snapshot.downloadURL;
// });



// // File or Blob named mountains.jpg
// var file = "ModernLisa.jpeg"

// // Create the file metadata
// var metadata = {
//   contentType: 'image/jpeg'
// };

// var storageRef = storage.ref();

// // Upload file and metadata to the object 'images/mountains.jpg'
// var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//   function(snapshot) {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case firebase.storage.TaskState.PAUSED: // or 'paused'
//         console.log('Upload is paused');
//         break;
//       case firebase.storage.TaskState.RUNNING: // or 'running'
//         console.log('Upload is running');
//         break;
//     }
//   }, 
// // function(error) {

// //   // A full list of error codes is available at
// //   // https://firebase.google.com/docs/storage/web/handle-errors
// //   switch (error.code) {
// //     case 'storage/unauthorized':
// //       // User doesn't have permission to access the object
// //       break;

// //     case 'storage/canceled':
// //       // User canceled the upload
// //       break;

// //     ...

// //     case 'storage/unknown':
// //       // Unknown error occurred, inspect error.serverResponse
// //       break;
// //   }
// // }, 
//     function() {
//   // Upload completed successfully, now we can get the download URL
//   var downloadURL = uploadTask.snapshot.downloadURL;
// });

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var artistName = document.getElementById('inputArtist');
var artDate = document.getElementById('inputDate');
var uploadBtn = document.getElementById('uploadImg');
var downUrl = "";

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
            // showimage(file);
        })
    storageRef.getDownloadURL().then(function (url) {
        downUrl = url;
        console.log(downUrl);
    })
});

uploadBtn.addEventListener('click', function() {
    auth.onAuthStateChanged(function (user) {
        var uid = user.uid;
        var artist = artistName.value;
        var date = artDate.value;
        var databaseRef = database.ref().child('users').child(uid).child('posts');
        var information = {
            email: user.email,
            uid: uid,
            url: downUrl,
            artist: artist,
            date: date
        }
        databaseRef.push(information);
    }) 
})


// fileButton.addEventListener('change', function(e) {
//     auth.onAuthStateChanged(function (user) {
//             var file = e.target.files[0];
//             var storageRef = storage.ref('photos/' + file.name);
//             var uploadTask = storageRef.put(file);
//             uploadTask.on('state_changed', 
//                 function progress(snapshot) {
//                     var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     // var metadata = uploadTask.snapshot.metadata;
//                     // var downloadURL = uploadTask.snapshot.downloadURL;
//                     // var fileRecord = {
//                     //     downloadURL: downloadURL,
//                     //     metadata: {
//                     //         fullPath: metadata.fullPath,
//                     //         name: metadata.name
//                     //     }
//                     // };
//                     uploader.value = percentage;
//                 },
//                 function error(err) {
//                     console.log('uploadTask error')
//                 },
//                 function complete() {
//                     console.log('complete');
//                     // showimage(file);
//                 }
//             );
//         var uid = user.uid;
//         var databaseRef = database.ref().child('users').child(uid).child('posts');
//         var downUrl = storageRef.getDownloadURL();
//         databaseRef.push(downUrl);
//         databaseRef.push(artistName);
//         databaseRef.push(date);
//         }
//     )});

// function showimage(e) {
//     var storageRef = firebase.storage().ref();
//     var spaceRef = storageRef.child('photos/' + e.name);
//     document.getElementById('photoBox').classList.remove('hide');
//     storageRef.child('photos/' + e.name).getDownloadURL().then(function(url) {
//         var test = url;
//         console.log(url);
//         document.getElementById('photoBox').src = test;
//     }).catch(function(error) {
//         console.log('show Image error')
//     });
// }


// document.onload = function feedImage() {
//     var storageRef = firebase.storage().ref();
//     var imageRef = storageRef.child('photos/' + e.name);
//     imageRef.getDownloadURL().then(function(url) {
//         var link = url;
//         var image = document.createElement('img');
//         feedImage.classList.add('feedImage');
//         var feedImage = document.getElementById('feedImage');
//         feedImage.src = link;
//     }).catch(function(error) {
//         console.log('feedImage error');
//     });
// }


// var storage    = firebase.storage();
// var storageRef = storage.ref();
// var spaceRef = storageRef.child('images/photo_1.png');

// storageRef.child('images/photo_1.png').getDownloadURL().then(function(url) {
//     var feedImg = document.getElementById('feedImg');
//     var imgUrl = url;
//     feedImg.src = imgUrl;
// }).catch(function(error) {
//     console.log('error');
// });