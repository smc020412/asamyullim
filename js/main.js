const siteConfig = {
  blogUrl: "#",
  storeUrl: "#",
  navItems: [
    { key: "about", label: "Company Overview", path: "about/" },
    { key: "works", label: "Product Description", path: "works/" },
    { key: "contact", label: "Contact", path: "contact/" },
  ],
};

function getCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("/about/")) return "about";
  if (path.includes("/works/")) return "works";
  if (path.includes("/contact/")) return "contact";
  return "home";
}

function getBasePath(page) {
  return page === "home" ? "./" : "../";
}

function renderSiteHeader() {
  const headerTarget = document.querySelector("[data-site-header]");
  if (!headerTarget) return;

  const currentPage = getCurrentPage();
  const basePath = getBasePath(currentPage);
  const usesOverlayHeader =
    currentPage === "home" || currentPage === "about" || currentPage === "works" || currentPage === "contact";
  const headerClass = usesOverlayHeader ? "site-header is-overlay is-at-top" : "site-header is-scrolled";
  const navLinks = siteConfig.navItems
    .map((item) => {
      const href = currentPage === item.key ? "./" : `${basePath}${item.path}`;
      const activeClass = currentPage === item.key ? ' class="is-active" aria-current="page"' : "";
      return `<a href="${href}"${activeClass}>${item.label}</a>`;
    })
    .join("");

  headerTarget.outerHTML = `
    <header class="${headerClass}">
      <div class="container header-inner">
        <a class="logo" href="${basePath}index.html" aria-label="Home">
          <img
            src="${basePath}images/${usesOverlayHeader ? "로고 (2).png" : "로고 (1).png"}"
            data-top-logo="${basePath}images/로고 (2).png"
            data-scrolled-logo="${basePath}images/로고 (1).png"
            alt="Company logo"
          />
        </a>

        <nav class="site-nav" aria-label="Main navigation">
          <div class="nav-links">
            ${navLinks}
          </div>

          <div class="nav-actions">
            <a
              class="nav-cta nav-blog"
              href="${siteConfig.blogUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="${basePath}images/${usesOverlayHeader ? "흰색블로그로고.png" : "블로그로고.png"}"
                data-top-logo="${basePath}images/흰색블로그로고.png"
                data-scrolled-logo="${basePath}images/블로그로고.png"
                alt="Blog"
              />
            </a>
            <a
              class="nav-cta"
              href="${siteConfig.storeUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Store
            </a>
          </div>

          <button
            class="mobile-menu-toggle"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </nav>
      </div>
    </header>
  `;
}

function syncHeaderScrollState() {
  const header = document.querySelector(".site-header.is-overlay");
  if (!header) return;

  const logo = header.querySelector(".logo img");
  const blogLogo = header.querySelector(".nav-blog img");
  const isScrolled = window.scrollY > 24;
  const targetState = isScrolled ? "scrolled" : "top";
  if (header.dataset.scrollState === targetState) return;

  header.dataset.scrollState = targetState;
  header.classList.toggle("is-at-top", !isScrolled);
  header.classList.toggle("is-scrolled", isScrolled);

  switchImage(logo, isScrolled ? logo?.dataset.scrolledLogo : logo?.dataset.topLogo);
  switchImage(blogLogo, isScrolled ? blogLogo?.dataset.scrolledLogo : blogLogo?.dataset.topLogo);
}

function switchImage(image, nextSrc) {
  if (!image || !nextSrc || image.getAttribute("src") === nextSrc) return;

  image.classList.add("is-switching");
  window.setTimeout(() => {
    image.src = nextSrc;
    image.classList.remove("is-switching");
  }, 180);
}

function renderSiteFooter() {
  const footerTarget = document.querySelector("[data-site-footer]");
  if (!footerTarget) return;

  const basePath = getBasePath(getCurrentPage());
  const navLinks = siteConfig.navItems
    .map((item) => `<a href="${basePath}${item.path}">${item.label}</a>`)
    .join("");

  footerTarget.outerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <nav class="footer-nav" aria-label="Footer navigation">
          ${navLinks}
          <a class="footer-blog-link" href="${siteConfig.blogUrl}" target="_blank" rel="noopener noreferrer">
            <img src="${basePath}images/블로그로고.png" alt="Blog" />
          </a>
          <a class="footer-store-link" href="${siteConfig.storeUrl}" target="_blank" rel="noopener noreferrer" aria-label="Store">
            🛒
          </a>
        </nav>

        <div class="footer-content">
          <a class="footer-logo" href="${basePath}index.html" aria-label="Home">
            <img src="${basePath}images/로고 (1).png" alt="Company logo" />
          </a>

          <div class="footer-info footer-service">
            <p><strong>Customer Service</strong></p>
            <p><strong>Phone :</strong> 000-0000-0000</p>
            <p><strong>Business Hours :</strong> Weekdays from 10:00 AM to 6:00 PM</p>
            <p>(Lunch Break: 12:00 PM to 1:00 PM)</p>
            <p><strong>Bank Account :</strong> Bank Name 000-0000-0000-00</p>
            <p>(Account Holder)</p>
            <p><strong>Business Name :</strong> Company Name</p>
          </div>

          <div class="footer-info footer-company">
            <p><strong>CEO :</strong> CEO Name</p>
            <p><strong>Headquarters :</strong> Company Address</p>
            <p><strong>Business Registration Number :</strong> 000-00-00000</p>
            <p><strong>E-commerce Business Registration Number :</strong></p>
            <p>0000-Region-0000</p>
            <p><strong>E-mail :</strong> email@example.com</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function animateHeroTitle() {
  const heroTitle = document.querySelector("[data-hero-title]");
  if (!heroTitle) return;

  const words = heroTitle.querySelectorAll(".hero-word");
  const abbreviation = heroTitle.querySelector(".hero-abbreviation");
  const wordDelay = 260;
  const abbreviationDelay = 120;
  const phraseDelay = 620;

  window.setTimeout(() => {
    abbreviation?.classList.add("is-visible");
  }, abbreviationDelay);

  window.setTimeout(() => {
    heroTitle.classList.add("is-emphasized");
    words.forEach((word, index) => {
      window.setTimeout(() => {
        word.classList.add("is-visible");
      }, index * wordDelay);
    });
  }, phraseDelay);
}

function initBuyerMeetingGallery() {
  const marquee = document.querySelector(".buyer-meeting-marquee");
  const track = document.querySelector(".buyer-meeting-track");
  if (!marquee || !track) return;

  const galleryImages = Array.from(track.querySelectorAll("img:not([aria-hidden='true'])"));
  if (!galleryImages.length) return;

  let offset = 0;
  let halfWidth = track.scrollWidth / 2;
  let lastTime = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let dragDistance = 0;
  let pressedImageIndex = null;
  const speed = 24;

  const normalizeOffset = () => {
    halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;
    while (offset <= -halfWidth) offset += halfWidth;
    while (offset > 0) offset -= halfWidth;
  };

  const render = () => {
    track.style.transform = `translateX(${offset}px)`;
  };

  const tick = (time) => {
    if (!lastTime) lastTime = time;
    const delta = (time - lastTime) / 1000;
    lastTime = time;

    if (!isDragging) {
      offset -= speed * delta;
      normalizeOffset();
      render();
    }

    window.requestAnimationFrame(tick);
  };

  track.addEventListener("pointerdown", (event) => {
    const allImages = Array.from(track.querySelectorAll("img"));
    const pressedImage = event.target.closest("img");
    isDragging = true;
    dragStartX = event.clientX;
    dragStartOffset = offset;
    dragDistance = 0;
    pressedImageIndex = pressedImage ? allImages.indexOf(pressedImage) % galleryImages.length : null;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const movement = event.clientX - dragStartX;
    dragDistance = Math.max(dragDistance, Math.abs(movement));
    offset = dragStartOffset + movement;
    normalizeOffset();
    render();
  });

  const endDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    if (dragDistance <= 6 && pressedImageIndex !== null) {
      openLightbox(pressedImageIndex);
    }

    pressedImageIndex = null;
  };

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `
    <button class="gallery-lightbox-close" type="button" aria-label="Close">×</button>
    <button class="gallery-lightbox-prev" type="button" aria-label="Previous image">‹</button>
    <img alt="" />
    <button class="gallery-lightbox-next" type="button" aria-label="Next image">›</button>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".gallery-lightbox-close");
  const prevButton = lightbox.querySelector(".gallery-lightbox-prev");
  const nextButton = lightbox.querySelector(".gallery-lightbox-next");
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const source = galleryImages[currentIndex];
    lightboxImage.src = source.currentSrc || source.src;
    lightboxImage.alt = source.alt;
  };

  const openLightbox = (index) => {
    showImage(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => showImage(currentIndex - 1));
  nextButton.addEventListener("click", () => showImage(currentIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });

  render();
  window.requestAnimationFrame(tick);
  window.addEventListener("resize", () => {
    normalizeOffset();
    render();
  });
}

function initCertificateLightbox() {
  const certificateImages = Array.from(document.querySelectorAll(".certificate-card img"));
  if (!certificateImages.length) return;

  const lightbox = createGalleryLightbox(certificateImages);
  certificateImages.forEach((image, index) => {
    image.addEventListener("click", () => lightbox.open(index));
  });
}

function createGalleryLightbox(images) {
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `
    <button class="gallery-lightbox-close" type="button" aria-label="Close">×</button>
    <button class="gallery-lightbox-prev" type="button" aria-label="Previous image">‹</button>
    <img alt="" />
    <button class="gallery-lightbox-next" type="button" aria-label="Next image">›</button>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".gallery-lightbox-close");
  const prevButton = lightbox.querySelector(".gallery-lightbox-prev");
  const nextButton = lightbox.querySelector(".gallery-lightbox-next");
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + images.length) % images.length;
    const source = images[currentIndex];
    lightboxImage.src = source.currentSrc || source.src;
    lightboxImage.alt = source.alt;
  };

  const open = (index) => {
    showImage(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => showImage(currentIndex - 1));
  nextButton.addEventListener("click", () => showImage(currentIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  window.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });

  return { open };
}

function initContactIntroAnimation() {
  const contactPage = document.querySelector(".contact-page");
  if (!contactPage) return;

  requestAnimationFrame(() => {
    contactPage.classList.add("is-ready");
  });
}

function initMobileNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = header?.querySelector(".mobile-menu-toggle");
  const navLinks = header?.querySelector(".nav-links");
  if (!header || !toggle || !navLinks) return;

  const setOpen = (isOpen) => {
    header.classList.toggle("is-mobile-menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-mobile-menu-open"));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setOpen(false);
  });
}

renderSiteHeader();
renderSiteFooter();
animateHeroTitle();
initBuyerMeetingGallery();
initCertificateLightbox();
initContactIntroAnimation();
initMobileNavigation();
syncHeaderScrollState();
window.addEventListener("scroll", syncHeaderScrollState, { passive: true });
