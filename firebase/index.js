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

// Ref pesan
var pesanRef = firebase.database().ref('messages');


// Listener form 
document.getElementById('hubungiForm').addEventListener('submit', submitForm);

// Form Submit
function submitForm(e) {
	e.preventDefault();

	var nama = getInputVal('nama');
	var subjek = getInputVal('subjek');
	var hp = getInputVal('hp');
	var pesan = getInputVal('pesan');

	// Save pesan ke database
	saveMessage(nama, subjek, hp, pesan);

	// Alert jempol
	document.querySelector('.alert').style.display = 'block';

	// Alert jempol hilang selama 2.9 detik
	setTimeout(function(){
		document.querySelector('.alert').style.display = 'none';
	},2900);

	// Bersihkan formulir setelah submit
	document.getElementById('hubungiForm').reset();
}

// Fungsi ambil nilai formulir
function getInputVal(id) {
	return document.getElementById(id).value;
}

// Save pesan ke database
function saveMessage(nama, subjek, hp, pesan) {
	var newMessageRef = pesanRef.push();
	newMessageRef.set({
		nama: nama,
		subjek: subjek,
		hp: hp,
		pesan: pesan
	});
}