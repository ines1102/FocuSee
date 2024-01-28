const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const roleSelect = document.getElementById("role-select");
const patientFields = document.getElementById("patient-fields");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

roleSelect.addEventListener("change", function () {
  patientFields.style.display = this.value === "Patient" ? "block" : "none";
  container.style.minHeight = this.value === "Patient" ? "600px" : "400px";
});

function onSignIn(googleUser) {
  // Obtenez les informations du profil de l'utilisateur connecté
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // N'utilisez pas cet ID pour votre logique d'authentification côté serveur. Utilisez l'ID token à la place.
  console.log("Full Name: " + profile.getName());
  console.log("Given Name: " + profile.getGivenName());
  console.log("Family Name: " + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // Le jeton ID est utilisé pour authentifier l'utilisateur côté serveur
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);

  // Initialisation du bouton Google Sign-In
  gapi.load("auth2", function () {
    gapi.auth2.init({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
    });
  });
}
document.getElementById("role-select").addEventListener("change", function () {
  var patientFields = document.getElementById("patient-fields");
  patientFields.style.display = this.value === "Patient" ? "block" : "none";
});

document.getElementById("role-select").addEventListener("change", function () {
  var patientFields = document.getElementById("patient-fields");
  var container = document.getElementById("container");
  if (this.value === "Patient") {
    patientFields.style.display = "block";
    container.style.minHeight = "600px"; // Ajustez selon vos besoins
  } else {
    patientFields.style.display = "none";
    container.style.minHeight = "400px"; // Taille originale
  }
});
