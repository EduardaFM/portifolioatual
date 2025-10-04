// Portfolio Interactive Features
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for any anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

  // Parallax effect for floating shapes
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Add hover sound effect simulation (visual feedback)
  const buttons = document.querySelectorAll(".contact-btn, .project-card");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = this.style.transform.includes("translateY")
        ? this.style.transform
        : "translateY(-3px) scale(1.02)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Typing animation for name
  const nameElement = document.querySelector(".name");
  if (nameElement) {
    const originalText = nameElement.textContent;
    nameElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        nameElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add ripple effect to buttons
  const contactButtons = document.querySelectorAll(".contact-btn");
  contactButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-tag"
  );
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Add click tracking for analytics (placeholder)
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectName = this.querySelector("h4").textContent;
      console.log(`Project clicked: ${projectName}`);
      // Here you could send analytics data
    });
  });

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Add CSS for keyboard navigation
  const keyboardStyle = document.createElement("style");
  keyboardStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #667eea !important;
            outline-offset: 2px !important;
        }
    `;
  document.head.appendChild(keyboardStyle);

  // Add theme toggle functionality (optional)
  const createThemeToggle = () => {
    const toggle = document.createElement("button");
    toggle.innerHTML = "🌙";
    toggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        `;

    toggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      this.innerHTML = document.body.classList.contains("dark-theme")
        ? "☀️"
        : "🌙";
    });

    document.body.appendChild(toggle);
  };

  // Uncomment to enable theme toggle
  // createThemeToggle();

  // Add dark theme CSS (optional)
  const darkThemeStyle = document.createElement("style");
  darkThemeStyle.textContent = `
        .dark-theme {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
        }
        .dark-theme .portfolio-card {
            background: rgba(44, 62, 80, 0.95) !important;
            color: #ecf0f1 !important;
        }
        .dark-theme .section-title {
            color: #ecf0f1 !important;
        }
        .dark-theme .project-info h4 {
            color: #ecf0f1 !important;
        }
        .dark-theme .project-info p {
            color: #bdc3c7 !important;
        }
        .dark-theme .project-card {
            background: #34495e !important;
        }
        .dark-theme .project-card:hover {
            background: #2c3e50 !important;
        }
    `;
  document.head.appendChild(darkThemeStyle);

  // Performance optimization: Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      // Scroll-based animations here
    }, 10);
  });

  // Add loading states for project links
  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const originalText = this.querySelector(".project-arrow i");
      originalText.className = "fas fa-spinner fa-spin";

      // Reset after 2 seconds (in case page doesn't load)
      setTimeout(() => {
        originalText.className = "fas fa-arrow-right";
      }, 2000);
    });
  });

  // Console welcome message
  console.log(`
    🚀 Portfolio carregado com sucesso!
    👩‍💻 Desenvolvido por Maria Eduarda
    💼 Desenvolvedora Frontend
    📧 Entre em contato via LinkedIn ou Instagram
    `);
});

// Add some utility functions
const utils = {
  // Smooth scroll to element
  scrollToElement: (element) => {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  },

  // Add loading state to element
  setLoading: (element, isLoading) => {
    if (isLoading) {
      element.style.opacity = "0.6";
      element.style.pointerEvents = "none";
    } else {
      element.style.opacity = "1";
      element.style.pointerEvents = "auto";
    }
  },

  // Format date
  formatDate: (date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  },
};

// Export utils for potential use in other scripts
window.portfolioUtils = utils;
