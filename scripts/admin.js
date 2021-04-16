// // Connect firebase
//   var firebaseConfig = {
//       apiKey: "AIzaSyBqbtFHnLGBEG1Y3CwWLleLBCeZtDOPpHU",
//       authDomain: "akbareuu.firebaseapp.com",
//       databaseURL: "https://akbareuu-default-rtdb.firebaseio.com",
//       projectId: "akbareuu",
//       storageBucket: "akbareuu.appspot.com",
//       messagingSenderId: "514507179273",
//       appId: "1:514507179273:web:65de833d510acf87223fd8",
//       measurementId: "G-EMZ5S4L8GF"
//     };
//     // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
database = firebase.database();
storage = firebase.storage();


// LOGIN SCRIPT
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("admin_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

  } else {
    // No user is signed in.

    document.getElementById("admin_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login() {

  var userEmail = document.getElementById("inputEmail").value;
  var userPass = document.getElementById("inputPassword").value;

  firebase.auth().signInWithEmailAndPassword(userEmail,
    userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);

      // ...
    });

}

function logout() {
  firebase.auth().signOut();
}
// END LOGIN SCRIPT

// INBOX SCRIPT
var inboxRef = database.ref().child("messages");
inboxRef.on("value", function(snapshot) {
  $("#show-inbox").empty();
  var pesanHTMLitem = "<p><b>Note:</b> Pesan yang telah dihapus tidak bisa dikembalikan</p>";
  snapshot.forEach(function(childsnapshot) {
    var inbox = childsnapshot.val();
    pesanHTMLitem += "<div class='pesanHTMLitem'></hr><div class='typhography-line'>";
    pesanHTMLitem += "<blockquote><p class='mb-1 blockquote blockquote-primary'";
    pesanHTMLitem += "<strong>" + inbox.subjek + "</strong><br>";
    pesanHTMLitem += inbox.pesan + "<br></br>";
    pesanHTMLitem += "<small>- " + inbox.nama + "</small>";
    pesanHTMLitem += "<small>(" + inbox.hp + ")</small><br>";
    pesanHTMLitem += "<button type='button' class='btn btn-danger btn-rounded delete-message' id='" + inbox.id + "'>Delete</button>";
    pesanHTMLitem += "</p></blockquote></div></div>";
  });
  $("#show-inbox").html(pesanHTMLitem);
  $(document).on("click", ".delete-message", function() {
    var inboxId = $(this).attr('id');
    database.ref("messages/" + inboxId).remove();
  });
});


// END INBOX SCRIPT

// EBOOK STORE SCRIPT
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function(e) {
  // File
  var file = e.target.files[0];

  // Buat Folder
  var storageRef = firebase.storage().ref('eBook/' + file.name);

  // Upload
  var task = storageRef.put(file);

  // Progres Upload
  task.on('state_changed',

    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    },

    function error(err) {
      // Reset
      document.getElementById('uploadBuku').reset();

      uploader.value = '0';
      // Alert
      document.querySelector('.alert-danger').style.display = 'block';

      // Alert hilang selama 2.9 detik
      setTimeout(function() {
        document.querySelector('.alert-danger').style.display = 'none';
      }, 2900);
    },

    function complete() {
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        window.alert('Copy URL:\n\n ' + downloadURL);
        // Reset
        document.getElementById('uploadBuku').reset();

        uploader.value = '0';
        // Alert
        document.querySelector('.alert-success').style.display = 'block';

        // Alert hilang selama 2.9 detik
        setTimeout(function() {
          document.querySelector('.alert-success').style.display = 'none';
        }, 2900);
      });
    }

  );
});

// END EBOOK SCRIPT