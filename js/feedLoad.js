loadFeed = document.getElementById('loadToFeed');
auth = firebase.auth();

auth.onAuthStateChanged(user => {
    var uid = user.uid;
    postsRef = firebase.database().ref().child('users').child(uid).child('posts');
    // artistName = postsRef.orderByChild('artist');
    // console.log(artistName);
    postsRef.orderByChild('artist').on('value', function(snapshot) {
    console.log(snapshot);
    // artistName = snapshot[artist];
    // console.log(artistName);
})})

// ref.child('users').orderByChild('name').equalTo('Alex').on('child_added',  ...)
