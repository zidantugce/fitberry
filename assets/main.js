const menuButton = document.querySelector("[data-menu-toggle]");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-gallery-filter]").forEach((filterGroup) => {
  const buttons = [...filterGroup.querySelectorAll("button")];
  const grid = document.querySelector(filterGroup.dataset.target);
  if (!grid) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      grid.querySelectorAll("[data-category]").forEach((item) => {
        item.hidden = filter !== "Tümü" && item.dataset.category !== filter;
      });
    });
  });
});

const lightbox = document.querySelector("[data-lightbox]");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("figcaption");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const prevButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  let currentItems = [];
  let currentIndex = 0;

  const getItems = (button) => {
    const group = button.closest("[data-lightbox-group]");
    return group ? [...group.querySelectorAll("[data-src]:not([hidden])")] : [button];
  };

  const showItem = (index) => {
    if (!currentItems.length) return;
    currentIndex = (index + currentItems.length) % currentItems.length;
    const item = currentItems[currentIndex];
    lightboxImage.src = item.dataset.src;
    lightboxImage.alt = item.querySelector("img")?.alt || item.dataset.caption || "";
    lightboxCaption.textContent = item.dataset.caption || "";
    prevButton.hidden = currentItems.length < 2;
    nextButton.hidden = currentItems.length < 2;
  };

  const openLightbox = (button) => {
    currentItems = getItems(button);
    showItem(currentItems.indexOf(button));
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-src]").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => showItem(currentIndex - 1));
  nextButton.addEventListener("click", () => showItem(currentIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showItem(currentIndex - 1);
    if (event.key === "ArrowRight") showItem(currentIndex + 1);
  });
}
