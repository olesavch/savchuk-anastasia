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

  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", (e) => {
        e.stopPropagation(); // Не даем защитным скриптам перехватить клик

        const currentItem = header.parentElement;
        const isOpen = currentItem.classList.contains("active");

        // Закрываем другие открытые пункты
        document.querySelectorAll(".accordion-item").forEach((item) => {
          item.classList.remove("active");
          const icon = item.querySelector(".accordion-icon");
          if (icon) icon.textContent = "+";
        });

        // Если пункт был закрыт — открываем его
        if (!isOpen) {
          currentItem.classList.add("active");
          const icon = currentItem.querySelector(".accordion-icon");
          if (icon) icon.textContent = "−";
        }
      });
    });

    /* --- 4. Интерактивный слайдер презентаций с превью --- */
    const slidesContainer = document.getElementById("slidesContainer");
    const prevBtn = document.getElementById("prevSlideBtn");
    const nextBtn = document.getElementById("nextSlideBtn");
    const slideCounter = document.getElementById("slideCounter");
    const thumbnailsSidebar = document.getElementById("thumbnailsSidebar");

    if (slidesContainer && thumbnailsSidebar) {
      const mainSlides = document.querySelectorAll(".slide-img");
      const totalSlides = mainSlides.length;
      let currentSlide = 0;

      // Автоматическая генерация превью слайдов
      mainSlides.forEach((slide, index) => {
        const thumbBox = document.createElement("div");
        thumbBox.className = "thumbnail-item" + (index === 0 ? " active" : "");

        const thumbImg = document.createElement("img");
        thumbImg.src = slide.src;
        thumbImg.alt = `Миниатюра ${index + 1}`;

        const thumbNum = document.createElement("span");
        thumbNum.className = "thumbnail-num";
        thumbNum.textContent = index + 1;

        thumbBox.appendChild(thumbImg);
        thumbBox.appendChild(thumbNum);

        // Переключение слайда при клике на миниатюру
        thumbBox.addEventListener("click", (e) => {
          e.stopPropagation();
          currentSlide = index;
          updateSlidePosition();
        });

        thumbnailsSidebar.appendChild(thumbBox);
      });

      function updateSlidePosition() {
        if (totalSlides > 0) {
          slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
          if (slideCounter) {
            slideCounter.textContent = `Слайд ${currentSlide + 1} из ${totalSlides}`;
          }

          const thumbnails =
            thumbnailsSidebar.querySelectorAll(".thumbnail-item");
          thumbnails.forEach((thumb, idx) => {
            if (idx === currentSlide) {
              thumb.classList.add("active");

              // Расчет точного положения прокрутки без зацикливания
              const thumbTop = thumb.offsetTop;
              const thumbHeight = thumb.offsetHeight;
              const sidebarHeight = thumbnailsSidebar.clientHeight;

              // Плавно подкручиваем боковую ленту к активному слайду
              thumbnailsSidebar.scrollTo({
                top: thumbTop - sidebarHeight / 2 + thumbHeight / 2,
                behavior: "smooth",
              });
            } else {
              thumb.classList.remove("active");
            }
          });
        }
      }
    }

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updateSlidePosition();
        }
      });

      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentSlide > 0) {
          currentSlide--;
          updateSlidePosition();
        }
      });
    }

    updateSlidePosition();
  }

  /* --- 5. Защита от копирования и скачивания --- */
  // Блокировка контекстного меню (правой кнопки мыши)
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Блокировка сочетаний клавиш (Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+U, F12)
  document.addEventListener("keydown", (e) => {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
      (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
      (e.ctrlKey && e.keyCode === 80) || // Ctrl+P
      (e.ctrlKey && e.keyCode === 67) // Ctrl+C
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Запрет перетаскивания картинок
  document.querySelectorAll(".protected-img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
});
