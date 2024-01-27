<?php
$dbPath = 'newsletter.db';

// Connexion à la base de données SQLite
$conn = new SQLite3($dbPath);

// Vérifier la connexion
if (!$conn) {
    die("La connexion à la base de données a échoué.");
}

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $nom = $_POST['nom'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    //le nom, l'email et le message dans la base de données
    $sql = "INSERT INTO messages (nom, email, message) VALUES ('$nom', '$email', '$message')";

    if ($conn->exec($sql)) {
        echo "Merci pour votre message, $nom!";
    } else {
        echo "Erreur lors de l'ajout du message.";
    }

    if (isset($_POST["newsletter"])) {
        // Ajouter l'adresse e-mail à la base de données pour la newsletter
        $sqlNewsletter = "INSERT INTO newsletter (email) VALUES ('$email')";

        if ($conn->exec($sqlNewsletter)) {
            echo "L'adresse e-mail a été ajoutée avec succès à la base de données pour la newsletter.";
        } else {
            echo "Erreur lors de l'ajout de l'adresse e-mail à la newsletter.";
        }
    }
}

// Fermer la connexion à la base de données
$conn->close();
?>

