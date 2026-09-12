"use strict";

(function () {
  const dashboard = document.getElementById("custom-dashboard");
  const decapContainer = document.getElementById("nc-root");
  const searchInput = document.getElementById("collectionSearch");

  if (!dashboard || !decapContainer) {
    return;
  }

  const contentRows = document.querySelectorAll(".content-row");
  const navItems = document.querySelectorAll(".nav-item");

  function isDashboardRoute() {
    const hash = window.location.hash;

    return (
      hash === "" ||
      hash === "#" ||
      hash === "#/" ||
      hash === "#/dashboard"
    );
  }

  function updateView() {
    if (isDashboardRoute()) {
      dashboard.style.display = "block";
      decapContainer.style.display = "none";
    } else {
      dashboard.style.display = "none";
      decapContainer.style.display = "block";
    }
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .trim();
  }

  function filterContent(searchTerm) {
    const query = normalizeText(searchTerm);

    contentRows.forEach((row) => {
      const text = normalizeText(row.textContent);

      row.style.display =
        !query || text.includes(query)
          ? "flex"
          : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      filterContent(event.target.value);
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
      });

      item.classList.add("active");
    });
  });

  window.addEventListener("hashchange", updateView);

  updateView();
})();