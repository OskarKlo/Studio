loadFeed = document.getElementById('loadToFeed');
auth = firebase.auth();
database = firebase.database();

// auth.onAuthStateChanged(user => {
//     var uid = user.uid;
//     postsRef = firebase.database().ref().child('users').child(uid).child('posts');
//     // artistName = postsRef.orderByChild('artist');
//     // console.log(artistName);
//     postsRef.orderByChild('artist').on('value', function(snapshot) {
//     console.log(snapshot);
//     // artistName = snapshot[artist];
//     // console.log(artistName);
// })})

// ref.child('users').orderByChild('name').equalTo('Alex').on('child_added',  ...)

// var leadsRef = database.ref('leads');
// leadsRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var childData = childSnapshot.val();
//     });
// });

function feedLoad() {
    auth.onAuthStateChanged(user => {
        console.log('Feed Loading!');
        var uid = user.uid;
        downUrlRef = firebase.database().ref('posts');
        downUrlRef.on('value', function(snapshot) {
            var snapshotData = snapshot.val();
            console.log(snapshotData);
            // snapshot.forEach(function(childSnapshot) {
            //     // var childData = childSnapshot.val();
            //     console.log(childSnapshot);
            // })
        })
    })
}

// feedLoad();

// ref.child("users").orderByChild('last_update').on("value", function (snapshot) {
//         snapshot.forEach(function(child) {
//             console.log(child.val()) // NOW THE CHILDREN PRINT IN ORDER
//         });

// likeButton.addEventListener('change', e => {
//     var likeCount = dbRefLikeCount.current_value();
//     likeCountDisplay.innerHTML = likeCount;
//     console.log('likeCountChanged');
// })

// document.getElementsByClassName('likeBtn').addEventListener('change', e => {
//         likes = like_countPostRef.current_value();
//         likeDisplay.innerHTML = likes;
//     });
// document.getElementsByClassName('unlikeBtn').addEventListener('change', e => {
//         likes = like_countPostRef.current_value();
//         likeDisplay.innerHTML = likes;
//     });

// var theOddOnes = document.getElementsByClassName("odd");
//                 for(var i=0; i<theOddOnes.length; i++)
//                 {
//                     alert(theOddOnes[i].innerHTML);
//                 }

// likeBtn.onclick = function() {
//         like_countPostRef.transaction(function (current_value) {
//             return (current_value || 0) + 1;
//         });
//     };

// function updateLikes() {
//     auth.onAuthStateChanged(user => {
//         var uid = user.uid;
//         var ref = database.ref().child('users').child(uid).child('posts');
//         ref.orderByChild('like_count').on('value', function (snapshot) {
//             snapshot.forEach(function(child) {
//                 child = child.val();
//                 var like_count = child['like_count'];
//                 likeDisplay.innerHTML = like_count;
//             })
//         })
//     })
// };

// setTimeout(updateLikes, 400);

// like_countPostRef.on('child_changed', function (snapshot) {
//         var likes = snapshot.val();
//         likeDisplay.innerHTML = likes;
//     })

function img_create(src, artist, likes, key) {
    var uniqueId = makeid();
    var like_countPostRef = database.ref().child('users').child(uid).child('posts').child(key).child('like_count');
    var rowDiv = document.createElement('div');
    var captionDiv = document.createElement('div');
    var img = document.createElement('img');
    var artistName = document.createElement('small');
    var likeBtn = document.createElement('button');
    var unlike = document.createElement('button');
    likeBtn.innerHTML = "Like";
    unlike.innerHTML = "Unlike";
    var heart = document.createElement('small');
    var heartIcon = document.createElement('i');
    var likeDisplay = document.createElement('small');
    // likeBtn.onclick = function() {
    //     like_countPostRef.transaction(function (current_value) {
    //         return (current_value || 0) + 1;
    //     });
    // };
    // unlike.onclick = function() {
    //     like_countPostRef.transaction(function (current_value) {
    //         return (current_value || 0) - 1;
    //     });
    // };
    likeDisplay.innerHTML = likes;
    artistName.innerHTML = artist;
    img.src = src;
    img.width = '600';
    img.height = '450';
    captionDiv.appendChild(likeBtn);
    captionDiv.appendChild(unlike);
    rowDiv.appendChild(img);
    rowDiv.appendChild(captionDiv);
    captionDiv.appendChild(heart);
    heart.appendChild(heartIcon);
    captionDiv.appendChild(artistName);
    captionDiv.appendChild(likeDisplay);
    document.body.appendChild(rowDiv);
    unlike.classList.add("allignLeft", "unlikeBtn", uniqueId);
    likeBtn.classList.add('allignLeft', "likeBtn", uniqueId);
    heart.classList.add("allignLeft");
    heartIcon.classList.add("fa", "fa-heart");
    artistName.classList.add("allignRight");
    likeDisplay.classList.add("allignLeft", "likeCount", uniqueId);
    rowDiv.classList.add("text-center", "col-md-4", "col-md-offset-4");
    captionDiv.classList.add("caption");
    return img;
}

function loadImg() {
    auth.onAuthStateChanged(user => {
        var uid = user.uid;
        userRef = firebase.database().ref().child('users').child(uid);
        postRef = userRef.child('posts');
        postRef.orderByChild('downloadUrl').on("value", function (snapshot) {
            snapshot.forEach(function(child) {
                console.log(child.val())
                child = child.val();
                artistName = child['artist'];
                likes = child['like_count'];
                downloadUrl = child['downloadUrl'];
                locoation = child['downloadUrl'];
                key = child['id'];
                console.log(downloadUrl);
                console.log(artistName);
                console.log(likes);
                img_create(downloadUrl, artistName, likes, key);
            });
        });

    })
};

loadImg();