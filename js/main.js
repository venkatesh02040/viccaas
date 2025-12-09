
// ✅ Only attach emergency form listener if it exists
const emergencyForm = document.getElementById("emergencyForm");
if (emergencyForm) {
  emergencyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll("input[required], textarea[required]");
    let allFilled = true;

    inputs.forEach((field) => {
      if (field.value.trim() === "") {
        allFilled = false;
        field.classList.add("error-field");
      } else {
        field.classList.remove("error-field");
      }
    });

    if (!allFilled) {
      Toastify({
        text: "⚠️ Please fill all fields before submitting.",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    const [name, phone, fromLoc, toLoc, desc] = [...inputs].map((i) => i.value.trim());
    const namePattern = /^[A-Za-z\s]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!namePattern.test(name)) {
      Toastify({
        text: "Please enter a valid full name (letters only).",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    if (!phonePattern.test(phone)) {
      Toastify({
        text: "Please enter a valid 10-digit contact number.",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    if (desc.length < 10) {
      Toastify({
        text: "Please enter at least 10 characters in the description.",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    Toastify({
      text: "Request received! Our emergency team will contact you shortly.",
      duration: 4000,
      gravity: "top",
      position: "right",
      backgroundColor: "#d11c5e",
      close: true,
    }).showToast();

    this.reset();
  });
}


// ✅ Contact Form Validation + Toastify Notifications
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector("#name").value.trim();
    const email = this.querySelector("#email").value.trim();
    const phone = this.querySelector("#phone").value.trim();
    const message = this.querySelector("#message").value.trim();

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!name || !email || !phone || !message) {
      Toastify({
        text: "Please fill all fields before submitting.",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    if (!namePattern.test(name)) {
      Toastify({
        text: "Please enter a valid name (letters only).",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    if (!emailPattern.test(email)) {
      Toastify({
        text: "Please enter a valid email address.",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    if (!phonePattern.test(phone)) {
      Toastify({
        text: "Please enter a valid 10-digit phone number.",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    if (message.length < 10) {
      Toastify({
        text: "Message must be at least 10 characters long.",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e74c3c",
        close: true,
      }).showToast();
      return;
    }

    Toastify({
      text: "Your message has been sent successfully!",
      duration: 4000,
      gravity: "top",
      position: "right",
      backgroundColor: "#27ae60",
      close: true,
    }).showToast();

    this.reset();
  });
}


// ✅ Navigation & Accessibility Script
(function () {
  const hamburger = document.getElementById('hamburger');
  const navCanvas = document.getElementById('nav-canvas');
  const navClose = document.getElementById('nav-close');
  const dropBtn = document.querySelector('.canvas-dropbtn');
  const dropContent = document.querySelector('.canvas-dropdown-content');
  const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
  let lastFocusedBeforeOpen = null;

  function openCanvas() {
    lastFocusedBeforeOpen = document.activeElement;
    navCanvas.classList.add('open');
    hamburger.classList.add('active');
    navCanvas.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = navCanvas.querySelector(focusableSelector);
    if (first) first.focus();
    document.addEventListener('keydown', handleKeydown);
  }

  function closeCanvas() {
    navCanvas.classList.remove('open');
    hamburger.classList.remove('active');
    navCanvas.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocusedBeforeOpen && typeof lastFocusedBeforeOpen.focus === 'function') {
      lastFocusedBeforeOpen.focus();
    } else {
      hamburger.focus();
    }
    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') closeCanvas();
    if (e.key === 'Tab') {
      const focusables = Array.from(navCanvas.querySelectorAll(focusableSelector)).filter(el => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      }
    }
  }

  if (dropBtn && dropContent) {
    dropBtn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      dropContent.classList.toggle('open');
      dropContent.setAttribute('aria-hidden', String(expanded));
    });
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navCanvas.classList.contains('open');
    if (isOpen) closeCanvas(); else openCanvas();
  });
  navClose.addEventListener('click', closeCanvas);

  navCanvas.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) closeCanvas();
  });

  navCanvas.addEventListener('click', (e) => {
    if (e.target === navCanvas) closeCanvas();
  });
})();

