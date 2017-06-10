    
    // const logIn = document.getElementById('signIn');

    // logIn.addEventListener('click', e => {
    // window.location.replace("signIn.html");
    // });

//Firebase Auth
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyB34kc_4jvEF3R7IeeGZ_rT_g5Kg0T7aWk",
    authDomain: "studio-8a79b.firebaseapp.com",
    databaseURL: "https://studio-8a79b.firebaseio.com",
    projectId: "studio-8a79b",
    storageBucket: "studio-8a79b.appspot.com",
    messagingSenderId: "1017262570857"
};
  firebase.initializeApp(config);

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    const logOut = document.getElementById('logOut');

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
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            window.location.replace("index.html");
            btnLogout.classList.remove('hide');
            logOut.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
            logOut.classList.add('hide');
        }
    });

    //End of Auth