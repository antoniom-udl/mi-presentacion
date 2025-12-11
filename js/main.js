// --- Año automático en el footer ---
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// --- Menú responsive ---
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Cerrar menú al hacer click en un enlace
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// --- Animación reveal al hacer scroll ---
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // fallback simple
  revealElements.forEach((el) => el.classList.add("visible"));
}

// --- Validación del formulario de contacto (envío simulado) ---
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const mensajeInput = document.getElementById("mensaje");
  const statusEl = document.getElementById("formStatus");

  const showError = (input, message) => {
    const group = input.closest(".form-group");
    const small = group.querySelector(".error-message");
    group.classList.add("invalid");
    small.textContent = message;
  };

  const clearError = (input) => {
    const group = input.closest(".form-group");
    const small = group.querySelector(".error-message");
    group.classList.remove("invalid");
    small.textContent = "";
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    statusEl.textContent = "";

    // Validar nombre
    if (!nombreInput.value.trim()) {
      showError(nombreInput, "Por favor, escribe tu nombre.");
      isValid = false;
    } else {
      clearError(nombreInput);
    }

    // Validar correo
    if (!correoInput.value.trim()) {
      showError(correoInput, "El correo es obligatorio.");
      isValid = false;
    } else if (!validateEmail(correoInput.value)) {
      showError(correoInput, "Escribe un correo válido.");
      isValid = false;
    } else {
      clearError(correoInput);
    }

    // Validar mensaje
    if (!mensajeInput.value.trim()) {
      showError(mensajeInput, "Por favor, escribe un mensaje.");
      isValid = false;
    } else {
      clearError(mensajeInput);
    }

    if (!isValid) return;

    // Envío simulado
    statusEl.textContent =
      "✅ Tu mensaje se ha enviado (simulado). ¡Gracias por contactarme!";
    contactForm.reset();

    // Quitar mensajes de error visual tras enviar
    [nombreInput, correoInput, mensajeInput].forEach(clearError);
  });
}

// --- Carrusel automático mejorado con puntos ---
const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const slides = carousel.querySelectorAll("img");
  const dotsContainer = carousel.parentElement.querySelector(
    "[data-carousel-dots]"
  );

  if (!slides.length || !dotsContainer) return;

  let current = 0;

  // Crear los puntos
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dotsContainer.appendChild(dot);

    // Click en cada dot para cambiar manualmente
    dot.addEventListener("click", () => {
      changeSlide(index);
      resetInterval();
    });
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  // Asegurar que solo el primero esté activo al inicio
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  function changeSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = index;

    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  // Cambio automático cada 2 segundos
  let interval = setInterval(() => {
    changeSlide((current + 1) % slides.length);
  }, 3500);

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      changeSlide((current + 1) % slides.length);
    }, 2000);
  }
});

// --- Mensaje flotante de bienvenida ---
window.addEventListener("load", () => {
  const msg = document.getElementById("welcome-msg");
  if (!msg) return;

  // Aparece después de 300ms
  setTimeout(() => {
    msg.classList.add("show");
  }, 300);

  // Se va después de 4 segundos
  setTimeout(() => {
    msg.classList.remove("show");
  }, 4300);
});


window.addEventListener("load", () => {
  const msg = document.getElementById("welcome-msg");
  if (!msg) return;

  setTimeout(() => msg.classList.add("show"), 300);
  setTimeout(() => msg.classList.remove("show"), 4300);
});
