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

function loadImg() {
    auth.onAuthStateChanged(user => {
        var uid = user.uid;
        userRef = firebase.database().ref().child('users').child(uid);
        postRef = userRef.child('posts');
        postRef.orderByChild('downloadUrl').on("value", function (snapshot) {
            snapshot.forEach(function(child) {
                console.log(child.val())
                child = child.val();
                downloadUrl = child['downloadUrl'];
                console.log(downloadUrl);
                var createImg = document.createElement('IMG');
                document.body.appendChild(createImg); 
                createImg.classList.add('feedImg');
                var feedImg = document.getElementsByClassName('feedImg');
                feedImg.src = downloadUrl;
            });
        });

    })
};

loadImg()