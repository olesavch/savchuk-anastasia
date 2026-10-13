document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. Мобильное Меню (Гамбургер) --- */
  const burgerBtn = document.getElementById("burgerBtn");
  const navMenu = document.getElementById("navMenu");

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener("click", () => {
      burgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Закрываем меню при клике на ссылку
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  /* --- 2. Фильтрация Статей в Блоге --- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const articleCards = document.querySelectorAll(".article-card");

  if (filterBtns.length > 0 && articleCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Активный класс для кнопки
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedCategory = btn.getAttribute("data-category");

        articleCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (selectedCategory === "all" || cardCategory === selectedCategory) {
            card.style.display = "block";
            card.style.animation = "fadeIn 0.4s ease forwards";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* --- 3. Аккордеон (FAQ) --- */
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const currentItem = header.parentElement;
      const isOpen = currentItem.classList.contains("active");

      // Закрываем другие пункты
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
        const icon = item.querySelector(".accordion-icon");
        if (icon) icon.textContent = "+";
      });

      if (!isOpen) {
        currentItem.classList.add("active");
        const icon = currentItem.querySelector(".accordion-icon");
        if (icon) icon.textContent = "−";
      }
    });
  });
});
