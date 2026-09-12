(function () {
  "use strict";

  const dashboard = document.getElementById("custom-dashboard");
  const searchInput = document.getElementById("collectionSearch");

  if (!dashboard) {
    return;
  }

  /*
   * Dashboard navigation.
   *
   * Content links intentionally use Decap's normal hash routes.
   * This means we do not bypass Decap's authentication or editing
   * functionality.
   */

  const contentRows = document.querySelectorAll(".content-row");
  const navItems = document.querySelectorAll(".nav-item");

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

  /*
   * Keep the dashboard as the visual entry point.
   *
   * Decap itself remains available through the content links.
   */

  window.NehruVicharCMS = {
    openDashboard() {
      window.location.href = "/admin/";
    },
  };
})();