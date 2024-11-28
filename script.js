// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select all navbar links
  const reveal = document.querySelectorAll('.reveal');

  // Add click event listener to each link
  reveal.forEach(link => {
    link.addEventListener('click', (event) => {

      // Get the section ID from the link's href attribute
      const targetId = link.getAttribute('href').substring(1); // Remove the '#' from the href
      const targetSection = document.getElementById(targetId);

      // Remove the fade-in class from all sections first (optional, for reset)
      const allSections = document.querySelectorAll('section');
      allSections.forEach(section => section.classList.remove('fade-in'));

      // Add the fade-in class to the targeted section
      if (targetSection) {
        targetSection.classList.add('fade-in');
      }
    });
  });
  // Intersection Observer for scroll-triggered fading
  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.1, // Trigger when 10% of the section is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in'); // Add fade-in class when in view
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => observer.observe(section));
});

  