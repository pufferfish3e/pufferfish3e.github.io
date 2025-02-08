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
