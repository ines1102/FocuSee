document.addEventListener("DOMContentLoaded", function () {
  const notifContainer = document.getElementById("notif-container");
  const message = notifContainer.innerText.trim();
  const messageType = notifContainer.getAttribute("data-type");

  if (message) {
    showNotification(message, messageType);
  }
});

function showNotification(message, type) {
  const notifContainer = document.getElementById("notif-container");

  const iconPath = type === "error" ? "cross-circle.svg" : "check-circle.svg";
  const iconAlt = type === "error" ? "Error" : "Success";
  const notificationClass = type === "error" ? "error" : "success";

  notifContainer.innerHTML = `
        <div class="notification ${notificationClass}">
          <div class="notification__body">
            <img src="{{ url_for('static', filename='static/Images/${iconPath}') }}" alt="${iconAlt}" class="notification__icon" />
            ${message}
          </div>
          <div class="notification__progress"></div>
        </div>
      `;
}

// Supprimer la notification après 3 secondes (ajustez selon vos besoins)
notifContainer.style.transform = "translateY(0)";
setTimeout(() => {
  notifContainer.style.transform = "translateY(30px)";
}, 3000);

// Notez que la requête Ajax a été ajustée pour rediriger vers index.html en cas de succès
fetch(window.location.href)
  .then((response) => response.json())
  .then((data) => {
    showNotification(data.message, data.error ? "error" : "success");

    if (!data.error) {
      // Rediriger vers index.html en cas de succès
      window.location.href = "/index"; // Assurez-vous que le chemin est correct
    } else {
      window.location.href = "/connexion"; // Assurez-vous que le chemin est correct
    }
  })
  .catch((error) => console.error("Error:", error));
