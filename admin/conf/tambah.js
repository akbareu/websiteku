var nama	= document.getElementById("nama");
var email	= document.getElementById("email");
var alamat	= document.getElementById("alamat");
var submitBtn = document.getElementById("submitBtn");

function submitClick() {

	var database = firebase.database().ref();

	database.child("Text").set("Some value");

}

