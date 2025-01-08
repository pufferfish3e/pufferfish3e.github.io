// Debounce function to prevent frequent scroll event calls
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), 1);
  };
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Skill buttons functionality
const skillBtns = document.querySelectorAll('.skill-btn');
const skillDescription = document.querySelector('.skill-description');

let activeButton = null;

skillBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    if (activeButton === this) {
      skillDescription.classList.remove('active');
      activeButton = null;
    } else {
      if (activeButton) {
        activeButton.classList.remove('active');
      }
      skillDescription.innerHTML = `<p>${this.getAttribute('data-content')}</p>`;
      skillDescription.classList.add('active');
      activeButton = this;
    }
  });
});

// Scroll event listener with debounce
window.addEventListener('scroll', debounce(() => {
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
    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector(`.nav-link[href="#${section.id}"]`).classList.add('active');
    }
  });
}, 200));

// Typewriter effect with typing flag
window.onload = function() {
  var words = ["student.", "programmer.", "developer."];
  var textElement = document.getElementById("typing-text");
  var textContainer = document.getElementById("text-container");
  var isTyping = false;

  function typeText(word, element, callback) {
    if (isTyping) return;
    isTyping = true;
    var speed = 100;
    element.innerHTML = '';
    textContainer.classList.add('typing');
    var i = 0;
    var timer = setInterval(function() {
      if (i < word.length) {
        element.innerHTML += word.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        isTyping = false;
        if (typeof callback === 'function') {
          callback();
        }
      }
    }, speed);
  }

  function deleteText(element, callback) {
    if (isTyping) return;
    isTyping = true;
    var speed = 100;
    var text = element.innerHTML;
    var i = text.length;
    var timer = setInterval(function() {
      if (i > 0) {
        element.innerHTML = text.substring(0, i - 1);
        i--;
      } else {
        clearInterval(timer);
        isTyping = false;
        textContainer.classList.remove('typing');
        if (typeof callback === 'function') {
          callback();
        }
      }
    }, speed);
  }

  function cycleWords(words, textElement, index) {
    index = index || 0;
    var word = words[index];
    typeText(word, textElement, function() {
      setTimeout(function() {
        deleteText(textElement, function() {
          cycleWords(words, textElement, (index + 1) % words.length);
        });
      }, 2000);
    });
  }

  cycleWords(words, textElement, 0);
};