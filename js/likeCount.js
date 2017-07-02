var database = firebase.database();

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

// upvotesRef.transaction(function (current_value) {
//   return (current_value || 0) + 1;
// });

const likeButton = document.getElementById('addLike');
const unlikeButton = document.getElementById('removeLike');
const likeCountDisplay = document.getElementById('likeCountDisplay');

// Switched to the new strucutre ensure the post-id ref child(zero)
const dbRefPosts = database.ref().child('users').child(uid).child('posts');
const dbRefPost = dbRefPosts.child();
const dbRefLikeCount = dbRefPost.child('like_count');

// const numLikes = document.getElementById('likeCount');
unlikeButton.addEventListener('click', e => {
    console.log('unlike clicked');
    dbRefLikeCount.transaction(function (current_value) {
  return (current_value || 0) - 1;
});
})

likeButton.addEventListener('click', e => {
    console.log('like clicked');
    dbRefLikeCount.transaction(function (current_value) {
  return (current_value || 0) + 1;
});
})


// When like_count changes innerHTML of like_count updates!
likeButton.addEventListener('change', e => {
    var likeCount = dbRefLikeCount.current_value();
    likeCountDisplay.innerHTML = likeCount;
    console.log('likeCountChanged');
})

