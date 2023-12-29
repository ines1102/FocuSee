<?php
// Chemin vers la base de données SQLite
$dbPath = '/chemin/vers/votre/base_de_donnees.db';

// Connexion à la base de données SQLite
$conn = new SQLite3($dbPath);

// Vérifier la connexion
if (!$conn) {
    die("La connexion à la base de données a échoué.");
}

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer l'adresse e-mail depuis le formulaire
    $email = $_POST["email"];

    // Ajouter l'adresse e-mail à la base de données
    $sql = "INSERT INTO newsletter (email) VALUES ('$email')";

    if ($conn->exec($sql)) {
        echo "L'adresse e-mail a été ajoutée avec succès à la base de données.";
    } else {
        echo "Erreur lors de l'ajout de l'adresse e-mail.";
    }
}

// Fermer la connexion à la base de données
$conn->close();
?>
