loadFeed = document.getElementById('loadToFeed');
auth = firebase.auth();
var postsRef;
auth.onAuthStateChanged(user => {
    var uid = user.uid;
    postsRef = firebase.database().ref().child('users').child(uid).child('posts');
})

// ref.child('users').orderByChild('name').equalTo('Alex').on('child_added',  ...)

postsRef.orderByChild('downloadUrl').on('child_added', e => {
    downloadUrl = e.value;
    console.log(downloadUrl);
})