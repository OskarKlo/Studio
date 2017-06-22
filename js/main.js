
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
        auth.createUserWithEmailAndPassword(email, pass).then(function(user) {
            console.log('successfuly authenticated');
            var uid = user.uid;
            console.log(uid);
            var ref = firebase.database().ref();
            var userRef = ref.child('users').child(uid);
            
            var userInfo = {
                uid: user.uid,
                email: user.email,
                pass: pass
            }

            userRef.set(userInfo);
        });
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
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



// var items = ['item1', 'item2', 'item3'];
// var copy = [];

// for (var i=0; i<items.length; i++) {
//   copy.push(items[i])
// }

var auth = firebase.auth();
 auth.onAuthStateChanged(function(user) {
    console.log('authStateChanged', user);
    if (user) {
        var userRef = firebase.database().ref().child('users').child(user.uid);
        userRef.on('value', function (snapshot) {
            console.log(snapshot + "snapshot!!!");
            var userDict = snapshot.val();
            console.log(userDict);
        })
    }});