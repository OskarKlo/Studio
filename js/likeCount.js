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

const dbRefPosts = firebase.database().ref().child('posts');
const dbRefPost = dbRefPosts.child('post-id');
const dbRefLikeList = dbRefPost.child('likes');
const dbRefLikeCount = dbRefPost.child('like_count');
const likeButton = document.getElementById('addLike');
const unlikeButton = document.getElementById('removeLike');
// const numLikes = document.getElementById('likeCount');
unlikeButton.addEventListener('click', e => {
    console.log('unlike clicked');
    dbRefLikeList.child('likes').remove();
    dbRefLikeCount.transaction(function (current_value) {
  return (current_value || 0) - 1;
});
})

likeButton.addEventListener('click', e => {
    console.log('like clicked');
    dbRefLikeList.push("true");
    dbRefLikeCount.transaction(function (current_value) {
  return (current_value || 0) + 1;
});
})