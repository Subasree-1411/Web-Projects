const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
  body.dataset.theme = storedTheme;
}

const updateThemeButton = () => {
  const isDark = body.dataset.theme === 'dark';
  themeToggle.textContent = isDark ? '??' : '??';
};

updateThemeButton();

themeToggle.addEventListener('click', () => {
  const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
  updateThemeButton();
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let testimonialIndex = 0;

const updateTestimonial = (index) => {
  testimonials.forEach((card, cardIndex) => {
    card.classList.toggle('active', index === cardIndex);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
};

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  updateTestimonial(testimonialIndex);
}, 5000);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    testimonialIndex = index;
    updateTestimonial(index);
  });
});

const validateField = (field) => {
  const value = field.value.trim();
  const messageBox = field.parentElement.querySelector('.error-message');

  if (!value) {
    field.classList.add('invalid');
    messageBox.textContent = 'This field is required.';
    return false;
  }

  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    field.classList.add('invalid');
    messageBox.textContent = 'Please enter a valid email address.';
    return false;
  }

  field.classList.remove('invalid');
  messageBox.textContent = '';
  return true;
};

const form = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = form.querySelectorAll('input, textarea');
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    formStatus.textContent = 'Please fix the highlighted fields before submitting.';
    formStatus.style.color = '#ff4d4d';
    return;
  }

  formStatus.textContent = 'Thank you! Your message has been sent successfully.';
  formStatus.style.color = 'var(--success)';
  form.reset();
});

const newsletterForm = document.querySelector('.newsletter-form');
const newsletterStatus = document.querySelector('.newsletter-status');

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input');
  const email = input.value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newsletterStatus.textContent = 'Please enter a valid email address.';
    newsletterStatus.style.color = '#ff4d4d';
    return;
  }

  newsletterStatus.textContent = 'Thanks for subscribing!';
  newsletterStatus.style.color = 'var(--success)';
  newsletterForm.reset();
});

const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 420) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('year').textContent = new Date().getFullYear();
