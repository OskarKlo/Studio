
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
        //Remove later!!!
        console.log(pass);
    });

    //SignUp event
    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        //Remove later!!!
        console.log(pass);
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
            userSet.classList.remove('hide');
            txtEmail.classList.add('hide');
            txtPassword.classList.add('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
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

