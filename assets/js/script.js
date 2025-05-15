const menuToggleBtn = document.getElementById('menu-toggle'); // bottom menu button
const navbar = document.querySelector('.monkey13'); // sidebar menu
const overlay = document.querySelector('.monkey2'); // overlay div
const navCloseBtn = document.querySelector('[data-nav-close-btn]'); // close button in menu
const navbarLinks = document.querySelectorAll('[data-nav-link]'); // menu links

// Toggle menu open/close on bottom menu button click
menuToggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Close menu on clicking close button or overlay
navCloseBtn.addEventListener('click', () => {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
});

// Close menu when clicking any menu link
navbarLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
  });
});
