document.addEventListener("DOMContentLoaded", function () {
  // Données de l'exemple pour le patient 1
  var dataPatient1 = {
    nom: "Nom du Patient 1",
    age: "30 ans",
    genre: "Masculin",
    taille: "175 cm",
    poids: "70 kg",
    image: "static/Images/profil.png",
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
    image: "static/Images/profil.png",
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

function getConseilsAcuite(acuite) {
  if (acuite >= -10 && acuite <= -9) {
    return [
      "Portez vos corrections en permanence, surtout pour des activités nécessitant une vision détaillée.",
      "Évitez l'exposition prolongée aux écrans, prenez des pauses visuelles régulières.",
    ];
  } else if (acuite >= -8 && acuite <= -6) {
    return [
      "Respectez strictement les instructions d'utilisation de vos lunettes ou lentilles.",
      "Protégez vos yeux contre la fatigue en ajustant l'éclairage lors de la lecture ou du travail.",
    ];
  } else if (acuite >= -5 && acuite <= -3) {
    return [
      "Consultez votre ophtalmologiste en cas de fluctuations visuelles.",
      "Privilégiez un éclairage uniforme et évitez les conditions lumineuses excessives.",
    ];
  } else if (acuite >= 0 && acuite <= -2) {
    return [
      "Portez vos corrections conformément à l'ordonnance, même si la vision semble stable.",
      "Pratiquez des exercices oculaires recommandés par votre professionnel de la santé.",
    ];
  } else if (acuite >= 1 && acuite <= 3) {
    return [
      "Réévaluez votre prescription en cas de changements perceptibles.",
      "Protégez vos yeux du soleil avec des lunettes adaptées aux conditions.",
    ];
  } else if (acuite >= 4 && acuite <= 6) {
    return [
      "Programmez des examens réguliers pour surveiller d'éventuelles modifications.",
      "Évitez les endroits poussiéreux ou venteux, et portez une protection appropriée.",
    ];
  } else if (acuite >= 7 && acuite <= 9) {
    return [
      "Discutez des options chirurgicales avec votre ophtalmologiste si approprié.",
      "Utilisez des lunettes de protection dans des environnements risqués.",
    ];
  } else if (acuite >= 10 && acuite <= 12) {
    return [
      "Collaborez étroitement avec votre ophtalmologiste pour un suivi régulier.",
      "Minimisez les risques de traumatismes oculaires en portant une protection adéquate.",
    ];
  } else {
    return ["Aucun conseil disponible pour cette acuité."];
  }
}

function updateConseilsVision(acuitePatient) {
  const conseilsElement = document.getElementById("conseilsVision");
  const conseils = getConseilsAcuite(acuitePatient);

  conseilsElement.innerHTML =
    "<strong>Conseils de Vision :</strong><br>" + conseils.join("<br>");
}
