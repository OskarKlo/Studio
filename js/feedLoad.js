loadFeed = document.getElementById('loadToFeed');
auth = firebase.auth();

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



function img_create(src, artist, likes, location) {
    var rowDiv = document.createElement('div');
    var captionDiv = document.createElement('div');
    var img = document.createElement('img');
    var artistName = document.createElement('small');
    var like = document.createElement('button');
    var unlike = document.createElement('button');
    like.innerHTML = "Like";
    unlike.innerHTML = "Unlike";
    var heart = document.createElement('small');
    var heartIcon = document.createElement('i');
    var like_count = document.createElement('small');
    artistName.innerHTML = artist;
    like_count.innerHTML = likes;
    img.src = src;
    img.width = '500';
    img.height = '350';
    captionDiv.appendChild(like);
    captionDiv.appendChild(unlike);
    rowDiv.appendChild(img);
    rowDiv.appendChild(captionDiv);
    captionDiv.appendChild(heart);
    heart.appendChild(heartIcon);
    captionDiv.appendChild(artistName);
    captionDiv.appendChild(like_count);
    document.body.appendChild(rowDiv);
    unlike.classList.add("allignLeft");
    like.classList.add('allignLeft');
    heart.classList.add("allignLeft");
    heartIcon.classList.add("fa", "fa-heart");
    artistName.classList.add("allignRight");
    like_count.classList.add("allignLeft");
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
                console.log(downloadUrl);
                console.log(artistName);
                console.log(likes);
                img_create(downloadUrl, artistName, likes);
                // var createImg = document.createElement('IMG');
                // document.body.appendChild(createImg); 
                // createImg.classList.add('feedImg');
                // var feedImg = document.getElementsByClassName('feedImg');
                // feedImg.src = downloadUrl;
            });
        });

    })
};

loadImg()