document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navbarLinks = document.querySelectorAll('.main-container .navbar a[href^="#"]');
  let currentSectionIndex = -1; // Initialize to ensure the first check updates the pointer

  // Function to update the active class on navbar links and center it
  const updateActiveLink = (index) => {
    // Only update if the section has changed
    if (currentSectionIndex !== index) {
      currentSectionIndex = index;
      navbarLinks.forEach(link => link.classList.remove('active'));
      if (navbarLinks[index]) {
        navbarLinks[index].classList.add('active');
        centerActiveLink(); // Assuming this function is defined elsewhere and efficiently centers the link
      }
    }
  };

  // Function to determine the current section based on scroll position
  const determineCurrentSection = () => {
    let newSectionIndex = 0;
    sections.forEach((section, index) => {
      if (window.scrollY >= (section.offsetTop - section.offsetHeight / 3)) {
        newSectionIndex = index;
      }
    });
    updateActiveLink(newSectionIndex);
  };

  // Listen for scroll events to update the active link
  window.addEventListener('scroll', determineCurrentSection);
});

function centerActiveLink() {
  const activeLink = document.querySelector('.navbar a.active');
  if (activeLink) {
    const navbar = document.querySelector('.navbar');
    const viewportHeight = window.innerHeight;
    // Get the bounding rectangle of the active link relative to the viewport
    const activeLinkRect = activeLink.getBoundingClientRect();
    // Calculate the vertical center of the active link
    const activeLinkCenter = activeLinkRect.top + activeLinkRect.height / 2;
    // Calculate the offset needed to center the active link in the viewport
    const centerOffset = (viewportHeight / 2) - activeLinkCenter;

    // Apply the offset to the navbar
    navbar.style.transform = `translateY(${centerOffset}px)`;
  }
}