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
    // User login
    document.getElementById("admin_div").style.display = "initial";
    document.getElementById("login_div").style.display = "none";
  } else {
    // No user is signed in.
  }
});


// Submit form login
function login() {
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  window.alert(email + " " + password);
}