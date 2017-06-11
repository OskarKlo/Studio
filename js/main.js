
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

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
            // window.location.replace("index.html");
            btnLogout.classList.remove('hide');
            txtEmail.classList.add('hide');
            txtPassword.classList.add('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
            txtEmail.classList.remove('hide');
            txtPassword.classList.remove('hide');
            btnLogin.classList.remove('hide');
            btnSignUp.classList.remove('hide');
        }
    });

    //End of Auth

    //Database 

    // var database = firebase.database();

    // const artistName = document.getElementById('artistName');
    // const artistEmail = document.getElementById('artistEmail');
    // const artistImage = document.getElementById('artistImage');
    // const branchTree = document.getElementById('addTree');

    // branchTree.addEventListener('click', e => {
    //     writeUserData(artistName, artistEmail, artistImage);
    //     console.log('success');
    // });

    // function writeUserData(name, email, imageUrl) {
    //     firebase.database().ref('users/' + name).set({
    //         username: name,
    //         email: email,
    //         profile_picture : imageUrl
    //     });
    // }

    const preObject = document.getElementById('object');
    const dbRefObject = firebase.database().ref().child('object');