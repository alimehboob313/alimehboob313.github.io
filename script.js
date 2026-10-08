const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Typing effect on the tagline
const tagline = document.querySelector("header p");
if (tagline && !reduce) {
  const text = tagline.textContent;
  tagline.textContent = "";
  tagline.classList.add("typing");
  let i = 0;
  setTimeout(function type() {
    tagline.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(type, 45);
  }, 700);
}

// Fade-in on scroll, with a stagger for cards and skills
if (!reduce) {
  const items = document.querySelectorAll("section, article, li");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("visible");
      observer.unobserve(el);
      // Hand control back to the normal hover effects
      setTimeout(() => {
        el.classList.remove("reveal", "visible");
        el.style.transitionDelay = "";
      }, 1500);
    });
  }, { threshold: 0.15 });

  items.forEach((el) => {
    el.classList.add("reveal");
    if (el.tagName !== "SECTION") {
      const position = Array.from(el.parentElement.children).indexOf(el);
      el.style.transitionDelay = position * 0.12 + "s";
    }
    observer.observe(el);
  });
}
