let isScrolling;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
  window.clearTimeout(isScrolling);
  nav.classList.add('hidden');
  isScrolling = setTimeout(function() {
    nav.classList.remove('hidden');
  }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function() {
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.classList.remove('visible');
    void targetSection.offsetWidth;
    setTimeout(() => {
      targetSection.classList.add('visible');
    }, 10);
  });
});

const slider = document.querySelector('.project-slider');
const cardContainers = document.querySelectorAll('.project-card-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const container = document.querySelector('.project-slider-container');

let currentIndex = 0; // ensure we start at project 1

function updateSlider() {
  cardContainers.forEach((containerEl, index) => {
    if (index === currentIndex) {
      containerEl.classList.add('active');
    } else {
      containerEl.classList.remove('active');
    }
  });
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cardContainers.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cardContainers.length) % cardContainers.length;
  updateSlider();
});

window.addEventListener('resize', updateSlider);

// Initialize slider position
updateSlider();
