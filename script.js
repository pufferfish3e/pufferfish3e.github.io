
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});


window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.7) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector(`.nav-link[href="#${section.id}"]`).classList.add('active');
    }
  });
});

const contactIcon = document.getElementById('contact-icon');

contactIcon.addEventListener('click', function() {
  contactIcon.classList.toggle('active');
});

const skillBtns = document.querySelectorAll('.skill-btn');
const skillDescription = document.querySelector('.skill-description');

skillBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    skillDescription.classList.remove('active');
    setTimeout(() => {
      const content = `<p>${this.getAttribute('data-content')}</p>`;
      skillDescription.innerHTML = content;
      skillDescription.classList.add('active');
    }, 500);
  });
});