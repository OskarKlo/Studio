// firebase.auth().onAuthStateChanged(user => {
//         if(user) {
//             var uid = user.uid;
//             console.log(uid);
//             const DB = firebase.database().ref();

//             var userStructure = {
//                 uid: uid,
//                 followers: {
//                     follower: "xyz",
//                     follower: "abc"
//                 },
//                 following: {
//                     following: "vbn",
//                     following: "uio"
//                 },
//                 posts: {
//                     postId: {
//                         like_count: 0,
//                         comments: {
//                             commentId: "Great Photo",
//                             commentId: "I love it"
//                         }
//                     }
//                 }
//             }
//             DB.push(userStructure);



//         } else {
//             console.log('error');
//         }
// });
























//         } else {
//             console.log('not logged in');
//         }
//     });