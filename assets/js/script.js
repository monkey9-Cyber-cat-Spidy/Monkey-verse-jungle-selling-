document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const navbarLinks = document.querySelectorAll("[data-nav-link]");

  const openMenu = () => {
    navbar?.classList.add("active");
    overlay?.classList.add("active");
  };

  const closeMenu = () => {
    navbar?.classList.remove("active");
    overlay?.classList.remove("active");
  };

  navOpenBtn?.addEventListener("click", openMenu);
  navCloseBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);
  navbarLinks.forEach(link => link.addEventListener("click", closeMenu));

  // Sticky header
  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("active", window.scrollY >= 400);
  });

  // Copyright
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
