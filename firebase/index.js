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

	saveMessage(nama, subjek, hp, pesan);
	console.log("Pesan terkirim!!");
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