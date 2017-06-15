var database = firebase.database();
// var ref = database.ref('posts');

// var data = {
//     likeCount: 43,
//     userId: "userName"
// }
// ref.push(data);

// var likeCount = document.getElementById('likeCount');

// var commentsRef = firebase.database().ref('post-comments/' + postId);
// commentsRef.on('child_added', function(data) {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });

// commentsRef.on('child_changed', function(data) {
//   setCommentValues(postElement, data.key, data.val().text, data.val().author);
// });

// commentsRef.on('child_removed', function(data) {
//   deleteComment(postElement, data.key);
// });



// var upvotesRef = new Firebase('https://docs-examples.firebaseio.com/android/saving-data/fireblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes');
// upvotesRef.transaction(function (current_value) {
//   return (current_value || 0) + 1;
// });

const dbRefPosts = firebase.database().ref().child('posts');
const dbRefPost = dbRefPosts.child('post-id');
const dbRefLikeList = dbRefPost.child('likes');
const dbRefLikeCount = dbRefPost.child('like_count');
const likeButton = document.getElementById('addLike');

likeButton.addEventListener('click', e => {
    console.log('clicked');
    dbRefLikeList.push("true");
    dbRefLikeCount.transaction(function (current_value) {
  return (current_value || 0) + 1;
});
//     console.log('clicked');
//     dbRefLikes.on('child_changed', snap => {
//     var likeCount = snap.val();
//     likeCount++;
//     console.log(likeCount);
//     dbRefLikes.set(likeCount);
// })
});

// dbRefPosts.on('child_added', snap => console.log(snap.val()));


// const postId = document.getElementById("post-id");

// const name = document.getElementById('artistName');
// const email = document.getElementById("artistEmail");
// const imageUrl = document.getElementById('artistImage');
// const likeCount = document.getElementById('likeCount');




// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('Users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }



// 'use strict';

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

// // Keeps track of the length of the 'likes' child list in a separate property.
// exports.countlikechange = functions.database.ref('/posts/{postid}/likes/{likeid}').onWrite(event => {
//   const collectionRef = event.data.ref.parent;
//   const countRef = collectionRef.parent.child('likes_count');

//   // Return the promise from countRef.transaction() so our function 
//   // waits for this async event to complete before it exits.
//   return countRef.transaction(current => {
//     if (event.data.exists() && !event.data.previous.exists()) {
//       return (current || 0) + 1;
//     }
//     else if (!event.data.exists() && event.data.previous.exists()) {
//       return (current || 0) - 1;
//     }
//   }).then(() => {
//     console.log('Counter updated.');
//   });
// });

// // If the number of likes gets deleted, recount the number of likes
// exports.recountlikes = functions.database.ref('/posts/{postid}/likes_count').onWrite(event => {
//   if (!event.data.exists()) {
//     const counterRef = event.data.ref;
//     const collectionRef = counterRef.parent.child('likes');
    
//     // Return the promise from counterRef.set() so our function 
//     // waits for this async event to complete before it exits.
//     return collectionRef.once('value')
//         .then(messagesData => counterRef.set(messagesData.numChildren()));
//   }
// });