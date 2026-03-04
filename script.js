// 1. Custom Cursor
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot follows immediately
  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

const lerp = (start, end, factor) => start + (end - start) * factor;

const renderCursor = () => {
  ringX = lerp(ringX, mouseX, 0.18);
  ringY = lerp(ringY, mouseY, 0.18);

  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  }

  requestAnimationFrame(renderCursor);
};
requestAnimationFrame(renderCursor);

// Add hover effects for interactive elements to expand the cursor ring
const interactiveElements = document.querySelectorAll(
  "a, button, .tile, .cell, input, select, textarea",
);
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursorRing) {
      cursorRing.style.width = "56px";
      cursorRing.style.height = "56px";
      cursorRing.style.borderColor = "var(--deep-rose)";
    }
  });
  el.addEventListener("mouseleave", () => {
    if (cursorRing) {
      cursorRing.style.width = "38px";
      cursorRing.style.height = "38px";
      cursorRing.style.borderColor = "var(--rose)";
    }
  });
});

// 2. Scroll Progress Bar & Sticky Nav & Parallax
const scrollBar = document.getElementById("scroll-bar");
const nav = document.querySelector(".nav");
const parallaxAara = document.querySelector(".watermark-aara.parallax");

window.addEventListener("scroll", () => {
  // Progress bar
  const scrollPx =
    document.documentElement.scrollTop || document.body.scrollTop;
  const winHeightPx =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollLen = `${(scrollPx / winHeightPx) * 100}%`;

  if (scrollBar) {
    scrollBar.style.width = scrollLen;
  }

  // Sticky Nav
  if (nav) {
    if (scrollPx > 40) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }

  // Parallax
  if (parallaxAara) {
    parallaxAara.style.transform = `translateY(${scrollPx * 0.22}px)`;
  }
});

// 3. Scroll Reveal with IntersectionObserver
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.12,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("vis");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".sr-el").forEach((el) => {
  observer.observe(el);
});

// 4. Form Submission Feedback
const form = document.getElementById("booking-form");
const submitBtn = document.getElementById("submit-btn");

if (form && submitBtn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Enquiry Sent Successfully";
    submitBtn.classList.add("btn-success");

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.classList.remove("btn-success");
      form.reset();
    }, 3500);
  });
}
