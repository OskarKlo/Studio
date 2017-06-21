
    var database = firebase.database();

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    const userSet = document.getElementById("userSettings");

    //Login Event
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    //SignUp event
    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        auth.createUserWithEmailAndPassword(email, pass).catch(function(error) {
            if (error.code){
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage);
        }
        else{
            console.log('successfuly authenticated');
            var ref = firebase.database().ref();
            var userRef = ref.child('users');
            var newUserRef = ref.child('users').push();
            var key = newUserRef.key;

            newUserRef.once('value', function(snapshot) {
                if (snapshot.hasChild(user.uid)) {
                    alert('exists already');
                } else {
            var userInfo = {
                id: key,
                uid: user.uid,
                email: user.email
            }
            newUserRef.set(userInfo);
                }
            })
        }
        });

        // const promise = auth.createUserWithEmailAndPassword(email, pass);
        // promise.catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            // usersRef.once('value', function(snapshot) {
            //   if (snapshot.hasChild(theDataToAdd)) {
            //     alert('exists');
            //   }
            // });
            var ref = firebase.database().ref();
            var userRef = ref.child('users');
            var newUserRef = ref.child('users').push();
            var key = newUserRef.key;

            newUserRef.once('value', function(snapshot) {
                if (snapshot.hasChild(user.uid)) {
                    alert('exists already');
                } else {
            var userInfo = {
                id: key,
                uid: user.uid,
                email: user.email
            }
            newUserRef.set(userInfo);
                }
            })

            console.log(user);
            btnLogout.classList.remove('hide');
            userSet.classList.remove('hide');
            txtEmail.classList.add('hide');
            txtPassword.classList.add('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
            // var uid = firebaseUser.uid;
            // console.log(uid);
            // const userRef = firebase.database().ref().child('users/' + uid);
        } else {
            console.log('not logged in');
            userSet.classList.add('hide');
            btnLogout.classList.add('hide');
            txtEmail.classList.remove('hide');
            txtPassword.classList.remove('hide');
            btnLogin.classList.remove('hide');
            btnSignUp.classList.remove('hide');
        }
    });

    //End of Auth

    const mainText = document.getElementById("mainText");
const submitBtn = document.getElementById("saveText"); 

// var database = firebase.database();

function submitClick() {
    console.log('clicked');
    var dbRef = firebase.database().ref();
    var messageText = mainText.value;
    // dbRef.child('text').set(messageText);
    // Pushes the value under new unique id child each time
    dbRef.push().set(messageText);
};


// document.onload = firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log(user.uid);
//     var uid = user.uid;
//     var userRef = firebase.storage().ref(uid);
//     var photosRef = userRef.child('photos');
//   }
// });

// var user = firebase.auth().currentUser;
// var name, email, photoUrl, uid, emailVerified;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                    // this value to authenticate with your backend server, if
//                    // you have one. Use User.getToken() instead.
// }