function showTab(he_TabId) {
    // Récupère tous les boutons et contenus
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    // Supprime la classe "active" de tous les boutons et contenus
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    // Ajoute la classe "active" au bouton cliqué et au contenu correspondant
    document.querySelector(`[onclick="showTab('${he_TabId}')"]`).classList.add("active");
    document.getElementById(he_TabId).classList.add("active");
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    let index = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", function () {
        if (index < carousel.children.length - 1) {
            index++;
        } else {
            index = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
        } else {
            index = carousel.children.length - 1;
        }
        updateCarousel();
    });

    // Auto-scroll toutes les 5 secondes
    setInterval(() => {
        if (index < carousel.children.length - 1) {
            index++;
        } else {
            index = 0;
        }
        updateCarousel();
    }, 5000);
});
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

window.addEventListener("scroll", function() {
    document.querySelectorAll(".reveal").forEach(function(el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add("visible");
        }
    });
});

function animateSkill(element, percentage) {
    let skillFill = element.querySelector(".skill-fill");
    let skillPercent = element.querySelector(".skill-percent");
    
    skillFill.style.width = "0"; // Réinitialise l'animation
    skillPercent.style.opacity = "0";
    
    setTimeout(() => {
        skillFill.style.width = percentage + "%"; // Anime la barre
    }, 100); 

    let counter = 0;
    let interval = setInterval(() => {
        if (counter >= percentage) {
            clearInterval(interval);
        } else {
            counter++;
            skillPercent.textContent = counter + "%"; // Fait monter le nombre
        }
    }, 20);

    setTimeout(() => {
        skillPercent.style.opacity = "1"; // Affiche le pourcentage
    }, 1000);
}

