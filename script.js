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
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    // Remove and re-add the 'visible' class to trigger the animation
    targetSection.classList.remove('visible');
    void targetSection.offsetWidth; // Trigger reflow
    targetSection.classList.add('visible');
    // Scroll to the target section
    targetSection.scrollIntoView({ behavior: 'smooth' });
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
  const currentCard = cardContainers[currentIndex];
  currentCard.style.opacity = '0'; // Start fade-out
  setTimeout(() => {
    currentCard.classList.remove('active');
    currentIndex = (currentIndex + 1) % cardContainers.length;
    const nextCard = cardContainers[currentIndex];
    nextCard.classList.add('active');
    setTimeout(() => {
      nextCard.style.opacity = '1'; 
    }, 10); // Small delay to ensure class is added before fade-in
  }, 500); // Delay to allow fade-out effect
});

prevBtn.addEventListener('click', () => {
  const currentCard = cardContainers[currentIndex];
  currentCard.style.opacity = '0'; // Start fade-out
  setTimeout(() => {
    currentCard.classList.remove('active');
    currentIndex = (currentIndex - 1 + cardContainers.length) % cardContainers.length;
    const prevCard = cardContainers[currentIndex];
    prevCard.classList.add('active');
    setTimeout(() => {
      prevCard.style.opacity = '1'; // Start fade-in
    }, 100); // Small delay to ensure class is added before fade-in
  }, 200); // Delay to allow fade-out effect
});

window.addEventListener('resize', updateSlider);

// Initialize slider position
updateSlider();