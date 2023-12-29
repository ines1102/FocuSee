document.addEventListener("DOMContentLoaded", function () {
  // Données de l'exemple pour le patient 1
  var dataPatient1 = {
    nom: "Nom du Patient 1",
    age: "30 ans",
    genre: "Masculin",
    taille: "175 cm",
    poids: "70 kg",
    image: "Images/profil.png",
    labels: [
      "18/11/2023",
      "01/12/2023",
      "15/01/2024",
      "02/02/2024",
      "24/03/2024",
      "19/04/2024",
      "05/05/2024",
    ],
    datasets: [
      {
        label: "Acuité Visuelle (Patient 1)",
        borderColor: "rgba(255, 255, 0, 1)", // Jaune
        data: [5, 6, 5.5, 7, 4, 5, 6.5],
        fill: false,
        pointRadius: 5,
      },
    ],
  };

  // Données de l'exemple pour le patient 2
  var dataPatient2 = {
    nom: "Nom du Patient 2",
    age: "25 ans",
    genre: "Féminin",
    taille: "160 cm",
    poids: "60 kg",
    image: "Images/profil.png",
    labels: [
      "18/11/2023",
      "01/12/2023",
      "15/01/2024",
      "02/02/2024",
      "24/03/2024",
      "19/04/2024",
      "05/05/2024",
    ],
    datasets: [
      {
        label: "Acuité Visuelle (Patient 2)",
        borderColor: "rgba(255, 0, 0, 1)", // Rouge
        data: [7, 6, 8, 9, 7, 6.5, 8],
        fill: false,
        pointRadius: 5,
      },
    ],
  };

  // Données pour la courbe moyenne
  var dataMoyenne = {
    labels: [
      "18/11/2023",
      "01/12/2023",
      "15/01/2024",
      "02/02/2024",
      "24/03/2024",
      "19/04/2024",
      "05/05/2024",
    ],
    datasets: [
      {
        label: "Moyenne Acuité Visuelle",
        borderColor: "rgb(255,69,0, 0.5)", // Orange avec une opacité de 50%
        data: [5, 5, 5, 5, 5, 5, 5],
        fill: false,
        pointRadius: 5, // Ajustez la taille des points si nécessaire
        borderDash: [5, 5], // Pour rendre la ligne de moyenne en pointillés
      },
    ],
  };

  // Configuration avec axes
  var optionsWithAxes = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        ticks: {
          stepSize: 1, // Ajustez cette valeur selon vos besoins
        },
      },
      y: {
        display: true,
        min: -10,
        max: 15,
        ticks: {
          stepSize: 1, // Ajustez cette valeur selon vos besoins
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return "Acuité Visuelle: " + context.parsed.y + "/10";
          },
        },
      },
    },
  };

  // Configuration sans axes
  var optionsWithoutAxes = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return "Acuité Visuelle: " + context.parsed.y + "/10";
          },
        },
      },
    },
  };

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: { labels: [], datasets: [] },
    options: optionsWithoutAxes,
  });

  // Fonction pour afficher les informations du patient et mettre à jour les conseils
  function afficherInfosPatient(selectedPatientKey, patientsData) {
    var infoContainer = document.getElementById("info-container");
    var selectedPatient = patientsData[selectedPatientKey];

    if (selectedPatient) {
      var total = selectedPatient.datasets[0].data.reduce(
        (acc, val) => acc + val,
        0
      );
      var moyenne = total / selectedPatient.datasets[0].data.length;
      document.getElementById("patientMoyenne").innerText = moyenne.toFixed(2);
      document.getElementById("patientName").innerText = selectedPatient.nom;
      document.getElementById("patientAge").innerText = selectedPatient.age;
      document.getElementById("patientGender").innerText =
        selectedPatient.genre;
      document.getElementById("patientHeight").innerText =
        selectedPatient.taille;
      document.getElementById("patientWeight").innerText =
        selectedPatient.poids;
      document.getElementById("patientImage").src = selectedPatient.image;
      infoContainer.style.display = "block";

      updateConseilsVision(moyenne); // Mise à jour des conseils en fonction de la moyenne
    } else {
      infoContainer.style.display = "none";
    }
  }

  // Fonction pour mettre à jour les données du patient et le graphique
  function updatePatientData() {
    var selectedPatient = document.getElementById("patients").value;

    if (selectedPatient === "patient1" || selectedPatient === "patient2") {
      myChart.data = {
        labels:
          selectedPatient === "patient1"
            ? dataPatient1.labels
            : dataPatient2.labels,
        datasets:
          selectedPatient === "patient1"
            ? [dataPatient1.datasets[0], dataMoyenne.datasets[0]]
            : [dataPatient2.datasets[0], dataMoyenne.datasets[0]],
      };
      myChart.options = optionsWithAxes;
    } else {
      myChart.data = { labels: [], datasets: [] };
      myChart.options = optionsWithoutAxes;
    }

    myChart.update();
    afficherInfosPatient(selectedPatient, {
      patient1: dataPatient1,
      patient2: dataPatient2,
    });
  }

  // Écouteur d'événements pour la sélection du patient
  var patientSelect = document.getElementById("patients");
  patientSelect.addEventListener("change", updatePatientData);

  // Appel initial pour la mise à jour des données
  updatePatientData();
});

function updateConseilsVision(acuitePatient) {
  const conseilsElement = document.getElementById("conseilsVision");

  if (acuitePatient >= 8) {
    conseilsElement.innerText =
      "Votre acuité visuelle est exceptionnelle. Pour la préserver, évitez les situations de fatigue oculaire extrême et assurez-vous de protéger vos yeux contre les UV et les écrans.";
  } else if (acuitePatient >= 7.5) {
    conseilsElement.innerText =
      "Vous avez une excellente acuité visuelle. Continuez de veiller à la santé de vos yeux en évitant les irritants comme la fumée et la poussière, et en maintenant une bonne hydratation.";
  } else if (acuitePatient >= 7) {
    conseilsElement.innerText =
      "Votre acuité est légèrement au-dessus de la moyenne. Continuez à protéger vos yeux avec une alimentation riche en vitamines et des minéraux.";
  } else if (acuitePatient >= 6.5) {
    conseilsElement.innerText =
      "Votre acuité est légèrement au-dessus de la moyenne. Continuez à protéger vos yeux avec une alimentation riche en vitamines et des minéraux.";
  } else if (acuitePatient >= 6) {
    conseilsElement.innerText =
      "Votre acuité visuelle est dans la moyenne. Maintenez une bonne hygiène de vie pour vos yeux, notamment en limitant l'exposition prolongée aux écrans.";
  } else if (acuitePatient >= 5.5) {
    conseilsElement.innerText =
      "Votre acuité est proche de la moyenne. Pensez à vérifier l'éclairage de votre espace de travail ou de lecture, et assurez-vous qu'il est suffisant pour ne pas fatiguer vos yeux.";
  } else {
    conseilsElement.innerText =
      "Votre acuité visuelle est en dessous de la moyenne. Assurez-vous de prendre des pauses régulières lors de la lecture ou du travail sur écran. Considérez des exercices oculaires pour améliorer la santé de vos yeux.";
  }
}
