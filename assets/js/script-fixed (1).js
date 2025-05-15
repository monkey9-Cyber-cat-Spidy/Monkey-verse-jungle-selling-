
// Toggle utility
const elemToggleFunc = (elem) => {
  elem.classList.toggle("active");
};

// Elements
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

// Open menu
navOpenBtn?.addEventListener("click", () => {
  navbar.classList.add("active");
  overlay.classList.add("active");
});

// Close menu
const closeMenu = () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

navCloseBtn?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);
navbarLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Header active on scroll
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => {
  window.scrollY >= 400
    ? header.classList.add("active")
    : header.classList.remove("active");
});

// Auto year update
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
