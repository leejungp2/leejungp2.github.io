// Dark-mode toggle. The initial theme is already applied (no-flash) by the
// inline script in head.html; this just wires the toggle button + persistence.
(function () {
  var themeBtns = document.querySelectorAll(".theme-toggle");
  themeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  });

  var header = document.querySelector(".site-header");
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("primary-nav");
  if (!header || !menuBtn || !nav) return;

  function setMenu(open) {
    header.classList.toggle("is-menu-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  menuBtn.addEventListener("click", function () {
    setMenu(!header.classList.contains("is-menu-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) setMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });
})();
