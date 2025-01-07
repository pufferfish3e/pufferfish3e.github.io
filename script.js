
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
    if (sectionTop < window.innerHeight * 0.8) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
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

window.onload = function() {
  var words = ["student.", "programmer.", "developer."];
  var textElement = document.getElementById("text-container").querySelector("p");

  function typeText(staticText, word, element, callback) {
    var speed = 100; 
    element.innerHTML = staticText;
    var i = 0;
    var timer = setInterval(function() {
      if (i < word.length) {
        element.innerHTML += word.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        if (typeof callback === 'function') {
          callback();
        }
      }
    }, speed);
  }

  function cycleWords(words, textElement, index) {
    index = index || 0;
    var word = words[index];
    typeText("and I am a ", word, textElement, function() {
      setTimeout(function() {
        textElement.innerHTML = "";
        cycleWords(words, textElement, (index + 1) % words.length);
      }, 2000); 
    });
  }

  cycleWords(words, textElement, 0);
};