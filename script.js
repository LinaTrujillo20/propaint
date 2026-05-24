// Espera a que cargue el DOM antes de usar querySelector
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll para los enlaces del menú
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Efecto de header al hacer scroll
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 30px rgba(13, 27, 42, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(13, 27, 42, 0.1)';
    }
  });

  // Animación de aparición al scroll (IntersectionObserver)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // opcional: deja de observar cuando ya apareció
    });
  }, observerOptions);

  // Elementos a animar (completado, porque tu código estaba cortado)
  const animatedEls = document.querySelectorAll(
    '.servicio-card, .beneficio-item, .galeria-item, .testimonio-card'
  );

  animatedEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return; // Si no estás en login.html, no hace nada

  const msg = document.getElementById("formMsg");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const toggle = document.getElementById("togglePassword");

  function setError(fieldName, text) {
    const el = document.querySelector(`[data-error="${fieldName}"]`);
    if (el) el.textContent = text || "";
  }

  toggle.addEventListener("click", () => {
    const isPass = password.type === "password";
    password.type = isPass ? "text" : "password";
    toggle.textContent = isPass ? "🙈" : "👁️";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";

    let ok = true;

    if (!email.value.trim()) {
      setError("email", "Ingresa tu correo.");
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      setError("email", "Correo inválido.");
      ok = false;
    } else {
      setError("email", "");
    }

    if (!password.value.trim()) {
      setError("password", "Ingresa tu contraseña.");
      ok = false;
    } else if (password.value.trim().length < 6) {
      setError("password", "Mínimo 6 caracteres.");
      ok = false;
    } else {
      setError("password", "");
    }

    if (!ok) return;

    msg.textContent = "✅ Validación OK. Conectando...";
    setTimeout(() => {
      msg.textContent = "🎉 Sesión iniciada (demo).";
      form.reset();
    }, 900);
  });
});
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

next.addEventListener("click", () => {

  index++;

  if (index >= slide.length) {
    index = 0;
  }

  actualizar();
});

prev.addEventListener("click", () => {

  index--;

  if (index < 0) {
    index = slide.length - 1;
  }

  actualizar();
});

function actualizar() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}