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
// END LOGIN SCRIPT

// INBOX SCRIPT
  var ref = database.ref('messages');
  ref.on('value', gotData, errData);

      function gotData(data) {
        var messages = data.val();
        var keys = Object.keys(messages);
          console.log(keys);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var hp     = messages[k].hp;
            var nama   = messages[k].nama;
            var pesan  = messages[k].pesan;
            var subjek = messages[k].subjek;
              // console.log(hp, nama, pesan, subjek);
              var li = document.createElement('li');
              li.classList.add("list-group-item", "list-group-item-action", "flex-column", "align-items-start");
              li.innerHTML = '<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + subjek + '</h5></div><p class="mb-1">' + pesan + '</p><small>' + hp + '</small><br><small>' + nama + '</small>';
              document.getElementById("messageList").appendChild(li);
              
          }
      }

      function errData(err) {
        console.log('Errors');
        console.log(err);
      }
// END INBOX SCRIPT

// EBOOK STORE SCRIPT
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');
  var metadata = {
    contentType: 'application/pdf'
  };

    fileButton.addEventListener('change', function(e) {
      // File
      var file = e.target.files[0];

      // Buat Folder
      var storageRef = firebase.storage().ref('eBook/' + file.name);

      // Upload
      var task = storageRef.put(file, metadata);

      // Progres Upload
      task.on('state_changed', 

        function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },

        function error(err) {
          // Reset
          document.getElementById('uploadCV').reset();

          uploader.value = '0';
          // Alert 
          document.querySelector('.alert-danger').style.display = 'block';

          // Alert hilang selama 2.9 detik
          setTimeout(function(){
          document.querySelector('.alert-danger').style.display = 'none';},2900);
        },

        function complete() {
          task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          window.alert('Copy URL:\n\n ' + downloadURL);
          // Reset
          document.getElementById('uploadCV').reset();

          uploader.value = '0';
          // Alert 
          document.querySelector('.alert-success').style.display = 'block';

          // Alert hilang selama 2.9 detik
          setTimeout(function(){
          document.querySelector('.alert-success').style.display = 'none';},2900);
          });
        }

      );
    });

  // INBOX SCRIPT
  var ref = storage.ref('messages');
  ref.on('value', gotData, errData);

      function gotData(data) {
        var messages = data.val();
        var keys = Object.keys(messages);
          console.log(keys);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var hp     = messages[k].hp;
            var nama   = messages[k].nama;
            var pesan  = messages[k].pesan;
            var subjek = messages[k].subjek;
              // console.log(hp, nama, pesan, subjek);
              var li = document.createElement('li');
              li.classList.add("list-group-item", "list-group-item-action", "flex-column", "align-items-start");
              li.innerHTML = '<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + subjek + '</h5></div><p class="mb-1">' + pesan + '</p><small>' + hp + '</small><br><small>' + nama + '</small>';
              document.getElementById("messageList").appendChild(li);
              
          }
      }

      function errData(err) {
        console.log('Errors');
        console.log(err);
      }

// END EBOOK SCRIPT
