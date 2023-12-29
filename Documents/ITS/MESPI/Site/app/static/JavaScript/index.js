// JavaScript avec jQuery
$(document).ready(function () {
  const bouton = $("#sign_up");

  bouton.click(function () {
    alert("Vous avez cliqué sur le bouton!");
  });

  $(".burger, .overlay").click(function () {
    $(".burger").toggleClass("clicked");
    $(".overlay").toggleClass("show");
    $("nav").toggleClass("show");
    $(".page-container").toggleClass("menu-open"); // Ajoute ou supprime la classe "menu-open" du conteneur de la page
  });

  const button = $(".settings");
  const closeButton = $(".close");
  const quickSettings = $(".quick-settings");

  button.click(() => {
    quickSettings.removeClass("none");
    quickSettings.removeClass("hide");
  });

  closeButton.click(() => {
    quickSettings.addClass("hide");
  });
});
