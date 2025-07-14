document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__links');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('navbar__links--open');
    toggle.textContent = menu.classList.contains('navbar__links--open') ? '✕' : '☰';
  });
});

document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("active");
});
