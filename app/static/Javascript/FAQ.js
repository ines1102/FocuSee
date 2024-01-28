document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".question");
    const answer = item.querySelector(".answer");
    const toggleIcon = item.querySelector(".toggle-icon");

    // Nouvel écouteur pour la question et l'icône
    [question, toggleIcon].forEach((element) => {
      element.addEventListener("click", function () {
        item.classList.toggle("active");
        if (item.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          answer.style.maxHeight = null;
        }
      });
    });
  });
});
