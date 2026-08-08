// ============================================
// Ali Bin Khalid — Portfolio Interactions
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---- Scroll progress bar ---- */
  const progressBar = document.getElementById("scroll-progress");
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  };

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById("back-to-top");
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  };

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const setActiveLink = () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", () => {
    updateProgress();
    toggleBackToTop();
    setActiveLink();
  });
  updateProgress();
  toggleBackToTop();
  setActiveLink();

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  /* ---- Rotating role text in hero ---- */
  const roles = [
    "Software Engineering Student",
    "AI/ML Intern @ Lambda Theta",
    "Computer Vision Enthusiast",
    "Full-Stack Hobbyist",
  ];
  const rotatorEl = document.getElementById("role-rotator-text");

  if (rotatorEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        rotatorEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        rotatorEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    };
    tick();
  }

  /* ---- Contact form: mailto handoff (no backend) ---- */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent(`Portfolio contact from ${name || "website visitor"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

      window.location.href = `mailto:alibinkhalid6@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
