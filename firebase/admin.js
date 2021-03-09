// Connect firebase 
  var firebaseConfig = {
      apiKey: "AIzaSyBqbtFHnLGBEG1Y3CwWLleLBCeZtDOPpHU",
      authDomain: "akbareuu.firebaseapp.com",
      databaseURL: "https://akbareuu-default-rtdb.firebaseio.com",
      projectId: "akbareuu",
      storageBucket: "akbareuu.appspot.com",
      messagingSenderId: "514507179273",
      appId: "1:514507179273:web:65de833d510acf87223fd8",
      measurementId: "G-EMZ5S4L8GF"
    };
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Autentikasi login Firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("admin_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    /*if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }*/

  } else {
    // No user is signed in.

    document.getElementById("admin_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("inputEmail").value;
  var userPass = document.getElementById("inputPassword").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}
