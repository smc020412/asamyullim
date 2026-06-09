const siteConfig = {
  overlayHeaderPages: ["home"],
  navItems: [
    { key: "about", label: "About", hoverLabel: "회사소개", path: "about/" },
    { key: "works", label: "Product", hoverLabel: "아산율림제품", path: "works/" },
    { key: "contact", label: "Contact", hoverLabel: "연락처", path: "contact/" },
    { key: "store", label: "Store", hoverLabel: "네이버스토어", href: "https://smartstore.naver.com/asanyulim" },
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

function getNavItemHref(item, currentPage, basePath) {
  return item.href || (currentPage === item.key ? "./" : `${basePath}${item.path}`);
}

function renderSiteHeader() {
  const headerTarget = document.querySelector("[data-site-header]");
  if (!headerTarget) return;

  const currentPage = getCurrentPage();
  const basePath = getBasePath(currentPage);
  const usesOverlayHeader = siteConfig.overlayHeaderPages.includes(currentPage);
  const headerClass = usesOverlayHeader ? "site-header is-overlay is-at-top" : "site-header is-scrolled";
  const navLinks = siteConfig.navItems
    .map((item) => {
      const href = getNavItemHref(item, currentPage, basePath);
      const activeClass = currentPage === item.key ? ' class="is-active" aria-current="page"' : "";
      return `
        <a href="${href}"${activeClass}>
          <span class="nav-label nav-label-default">${item.label}</span>
          <span class="nav-label nav-label-hover" aria-hidden="true">${item.hoverLabel}</span>
        </a>
      `;
    })
    .join("");

  headerTarget.outerHTML = `
    <header class="${headerClass}">
      <div class="container header-inner">
        <a class="logo" href="${basePath}index.html" aria-label="Home">
          <img
            src="${basePath}images/로고.png"
            data-top-logo="${basePath}images/로고.png"
            data-scrolled-logo="${basePath}images/로고.png"
            alt="Company logo"
          />
        </a>

        <nav class="site-nav" aria-label="Main navigation">
          <div class="nav-links">
            ${navLinks}
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
  const isScrolled = window.scrollY > 24;
  const targetState = isScrolled ? "scrolled" : "top";
  if (header.dataset.scrollState === targetState) return;

  header.dataset.scrollState = targetState;
  header.classList.toggle("is-at-top", !isScrolled);
  header.classList.toggle("is-scrolled", isScrolled);

  switchImage(logo, isScrolled ? logo?.dataset.scrolledLogo : logo?.dataset.topLogo);
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
  const currentPage = getCurrentPage();
  const navLinks = siteConfig.navItems
    .map((item) => `<a href="${getNavItemHref(item, currentPage, basePath)}">${item.label}</a>`)
    .join("");

  footerTarget.outerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <nav class="footer-nav" aria-label="Footer navigation">
          ${navLinks}
        </nav>

        <div class="footer-content">
          <a class="footer-logo" href="${basePath}index.html" aria-label="Home">
            <img src="${basePath}images/로고.png" alt="Company logo" />
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

function initHomeHeroSlider() {
  const slider = document.querySelector(".home-hero-slider");
  const track = slider?.querySelector(".home-hero-track");
  const prevButton = slider?.querySelector(".home-hero-arrow-prev");
  const nextButton = slider?.querySelector(".home-hero-arrow-next");
  const pagination = slider?.querySelector(".home-hero-pagination");
  if (!slider || !track || track.children.length < 2) return;

  const slideTotal = track.children.length;
  let autoTimer = null;
  let isDragging = false;
  let isAnimating = false;
  let currentIndex = 0;
  let startX = 0;
  let dragOffset = 0;

  const getSlideWidth = () => slider.clientWidth;

  const updatePagination = () => {
    const dots = Array.from(pagination?.querySelectorAll(".home-hero-dot") || []);
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const createPagination = () => {
    if (!pagination) return;

    pagination.classList.toggle("has-fade", slideTotal > 5);
    pagination.innerHTML = Array.from({ length: slideTotal }, (_, index) => {
      return `<button class="home-hero-dot" type="button" aria-label="Go to image ${index + 1}"></button>`;
    }).join("");

    pagination.querySelectorAll(".home-hero-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (index === currentIndex || isAnimating) return;
        stopAuto();
        jumpToIndex(index);
        startAuto();
      });
    });

    updatePagination();
  };

  const stopAuto = () => {
    if (!autoTimer) return;
    window.clearInterval(autoTimer);
    autoTimer = null;
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = window.setInterval(() => {
      slideNext();
    }, 3000);
  };

  const resetTrack = () => {
    track.style.transition = "none";
    track.style.transform = `translateX(${-getSlideWidth()}px)`;
    track.offsetHeight;
    track.style.transition = "";
  };

  const slideNext = () => {
    if (isAnimating) return;

    isAnimating = true;
    track.style.transition = "";
    track.style.transform = `translateX(${-getSlideWidth() * 2}px)`;

    window.setTimeout(() => {
      track.append(track.firstElementChild);
      resetTrack();
      currentIndex = (currentIndex + 1) % slideTotal;
      updatePagination();
      isAnimating = false;
    }, 540);
  };

  const slidePrev = () => {
    if (isAnimating) return;

    isAnimating = true;
    track.style.transition = "";
    track.style.transform = "translateX(0)";

    window.setTimeout(() => {
      track.prepend(track.lastElementChild);
      resetTrack();
      currentIndex = (currentIndex - 1 + slideTotal) % slideTotal;
      updatePagination();
      isAnimating = false;
    }, 540);
  };

  const jumpToIndex = (targetIndex) => {
    const forwardSteps = (targetIndex - currentIndex + slideTotal) % slideTotal;
    const backwardSteps = (currentIndex - targetIndex + slideTotal) % slideTotal;
    const shouldMoveForward = forwardSteps <= backwardSteps;
    const steps = shouldMoveForward ? forwardSteps : backwardSteps;

    for (let i = 0; i < steps; i += 1) {
      if (shouldMoveForward) {
        track.append(track.firstElementChild);
      } else {
        track.prepend(track.lastElementChild);
      }
    }

    currentIndex = targetIndex;
    resetTrack();
    updatePagination();
  };

  const finishDrag = () => {
    if (!isDragging) return;

    const threshold = slider.clientWidth * 0.16;
    slider.classList.remove("is-dragging");
    isDragging = false;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) {
        slideNext();
      } else {
        slidePrev();
      }
    } else {
      track.style.transition = "";
      track.style.transform = `translateX(${-getSlideWidth()}px)`;
    }

    dragOffset = 0;
    startAuto();
  };

  slider.addEventListener("pointerdown", (event) => {
    if (isAnimating) return;
    if (event.target.closest("button")) return;

    isDragging = true;
    startX = event.clientX;
    dragOffset = 0;
    track.style.transition = "none";
    slider.classList.add("is-dragging");
    slider.setPointerCapture(event.pointerId);
    stopAuto();
  });

  slider.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    dragOffset = event.clientX - startX;
    track.style.transform = `translateX(${-getSlideWidth() + dragOffset}px)`;
  });

  slider.addEventListener("pointerup", (event) => {
    if (slider.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId);
    }
    finishDrag();
  });

  slider.addEventListener("pointercancel", finishDrag);
  slider.addEventListener("lostpointercapture", finishDrag);
  window.addEventListener("resize", resetTrack);
  prevButton?.addEventListener("click", () => {
    stopAuto();
    slidePrev();
    startAuto();
  });
  nextButton?.addEventListener("click", () => {
    stopAuto();
    slideNext();
    startAuto();
  });

  track.prepend(track.lastElementChild);
  createPagination();
  resetTrack();
  startAuto();
}

function initHomeProductCarousel() {
  const carousel = document.querySelector(".home-product-carousel");
  const track = carousel?.querySelector(".home-product-track");
  if (!carousel || !track || track.children.length < 2) return;

  let offset = 0;
  let autoTimer = null;
  let animationFrame = null;
  let isDragging = false;
  let startX = 0;
  let startOffset = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;

  const getStep = () => {
    const first = track.firstElementChild;
    const second = first?.nextElementSibling;
    if (!first) return 0;

    const firstRect = first.getBoundingClientRect();
    const secondRect = second?.getBoundingClientRect();
    return secondRect ? secondRect.left - firstRect.left : firstRect.width;
  };

  const render = () => {
    track.style.transform = `translateX(${offset}px)`;
  };

  const normalize = (shouldPreserveDrag = false) => {
    let step = getStep();
    if (!step) return;

    while (offset <= -step) {
      offset += step;
      if (shouldPreserveDrag) startOffset += step;
      track.append(track.firstElementChild);
      step = getStep();
    }

    while (offset > 0) {
      track.prepend(track.lastElementChild);
      step = getStep();
      offset -= step;
      if (shouldPreserveDrag) startOffset -= step;
    }
  };

  const stopAuto = () => {
    if (autoTimer) {
      window.clearTimeout(autoTimer);
      autoTimer = null;
    }

    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  };

  const glideAfterDrag = () => {
    let lastFrameTime = 0;
    const friction = 0.0038;
    const minVelocity = 0.018;

    const tick = (time) => {
      if (!lastFrameTime) lastFrameTime = time;
      const delta = Math.min(time - lastFrameTime, 32);
      lastFrameTime = time;

      offset += velocity * delta;
      normalize();
      render();
      velocity *= Math.exp(-friction * delta);

      if (Math.abs(velocity) > minVelocity) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      animationFrame = null;
      startAuto();
    };

    animationFrame = window.requestAnimationFrame(tick);
  };

  const animateStep = () => {
    if (isDragging) return;

    const step = getStep();
    if (!step) return;

    const from = offset;
    const to = offset - step * 2;
    const duration = 8000;
    let startTime = null;

    const tick = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = (1 - Math.cos(Math.PI * progress)) / 2;

      offset = from + (to - from) * eased;
      render();

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      normalize();
      render();
      animationFrame = null;
      autoTimer = window.setTimeout(animateStep, 420);
    };

    animationFrame = window.requestAnimationFrame(tick);
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = window.setTimeout(animateStep, 420);
  };

  carousel.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startOffset = offset;
    lastX = event.clientX;
    lastTime = performance.now();
    velocity = 0;
    carousel.classList.add("is-dragging");
    carousel.setPointerCapture(event.pointerId);
    stopAuto();
  });

  carousel.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const now = performance.now();
    const deltaTime = Math.max(now - lastTime, 1);
    const deltaX = event.clientX - lastX;
    velocity = deltaX / deltaTime;
    lastX = event.clientX;
    lastTime = now;
    offset = startOffset + event.clientX - startX;
    normalize(true);
    render();
  });

  const finishDrag = (event) => {
    if (!isDragging) return;

    isDragging = false;
    carousel.classList.remove("is-dragging");
    if (event?.pointerId && carousel.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }

    normalize();
    render();

    if (Math.abs(velocity) > 0.018) {
      glideAfterDrag();
      return;
    }

    startAuto();
  };

  carousel.addEventListener("pointerup", finishDrag);
  carousel.addEventListener("pointercancel", finishDrag);
  carousel.addEventListener("lostpointercapture", finishDrag);
  window.addEventListener("resize", () => {
    normalize();
    render();
  });

  track.prepend(track.lastElementChild);
  offset = -getStep();
  render();
  startAuto();
}

renderSiteHeader();
renderSiteFooter();
initHomeHeroSlider();
initHomeProductCarousel();
animateHeroTitle();
initBuyerMeetingGallery();
initCertificateLightbox();
initContactIntroAnimation();
initMobileNavigation();
syncHeaderScrollState();
window.addEventListener("scroll", syncHeaderScrollState, { passive: true });
