// La logique côté client pour ajouter un patient
function ajouterPatient() {
    // Récupérer les valeurs du formulaire
    var nom = document.getElementById('nom').value;
    var prenom = document.getElementById('prenom').value;
    var age = document.getElementById('age').value;
    var sexe = document.getElementById('sexe').value;
    var taille = document.getElementById('taille').value;
    var poids = document.getElementById('poids').value;

    // Créer un objet patient
    var nouveauPatient = {
        nom: nom,
        prenom: prenom,
        age: age,
        sexe: sexe,
        taille: taille,
        poids: poids
    };

    // Envoyer les données au serveur (à implémenter côté serveur)
    // Utilisez une requête AJAX ou un autre moyen pour envoyer les données au serveur

    // Réinitialiser le formulaire après l'ajout
    document.getElementById('patientForm').reset();
}
