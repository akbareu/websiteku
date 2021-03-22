// // Connect firebase 
// 	var firebaseConfig = {
// 	    apiKey: "AIzaSyBqbtFHnLGBEG1Y3CwWLleLBCeZtDOPpHU",
// 	    authDomain: "akbareuu.firebaseapp.com",
// 	    databaseURL: "https://akbareuu-default-rtdb.firebaseio.com",
// 	    projectId: "akbareuu",
// 	    storageBucket: "akbareuu.appspot.com",
// 	    messagingSenderId: "514507179273",
// 	    appId: "1:514507179273:web:65de833d510acf87223fd8",
// 	    measurementId: "G-EMZ5S4L8GF"
// 	  };
// 	  // Initialize Firebase
// 	firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#kirimPesan").click(function(){

	// Ambil nilai inputan
	var message = {
		id: 	$("#nama").val() + Date.now(),
		nama: 	$("#nama").val(),
		subjek: $("#subjek").val(),
		hp: 	$("#hp").val(),
		pesan: 	$("#pesan").val()
	}
	inputDatabase(message);
	
	// Alert jempol
	document.querySelector('.alert').style.display = 'block';

	// Alert jempol hilang selama 2.9 detik
	setTimeout(function(){
		document.querySelector('.alert').style.display = 'none';
	},2900);

	// Bersihkan formulir setelah submit
	document.getElementById('hubungiForm').reset();

});

function inputDatabase(m) {
	database.ref("messages/" + m.id).set(m);
}