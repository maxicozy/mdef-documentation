let updatePointer; // Declare updatePointer in the global scope

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navbarLinks = document.querySelectorAll('.main-container .navbar a[href^="#"]');
  let currentSectionIndex = -1; // Initialize to -1 to ensure the first check updates the pointer

  // Function to update the pointer and the active class on navbar links
  updatePointer = (index) => {
    centerActiveLink();
    // Remove active class from all navbar links
    navbarLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to the current navbar link
    if (navbarLinks[index]) {
      navbarLinks[index].classList.add('active');
    }
  };

  // Function to determine the current section based on scroll position
  const determineCurrentSection = () => {
    let newSectionIndex = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        newSectionIndex = index;
      }
    });
    return newSectionIndex;
  };

  // Add scroll event listener to update pointer based on scroll position
  window.addEventListener('scroll', () => {
    const newSectionIndex = determineCurrentSection();
    if (newSectionIndex !== currentSectionIndex) {
      currentSectionIndex = newSectionIndex;
      updatePointer(currentSectionIndex);
    }
  });

  // Add click event listeners to navbar links for smooth scrolling
  navbarLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor click behavior
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update the active class immediately on click, without waiting for scroll
        updatePointer(index);
      }
    });
  });
});

document.querySelectorAll('.nav-link').forEach((link, index) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Update the active class immediately on click, without waiting for scroll
      updatePointer(index);
      // After updating the active link, center it in the navbar
      centerActiveLink(); // Call this function after updating the active link
    }
  });
});

function centerActiveLink() {
  const navbar = document.querySelector('.navbar'); // Ensure this selects your navbar
  const activeLink = navbar.querySelector('.active'); // Select the active link within the navbar

  if (activeLink) {
    const linkTopOffset = activeLink.getBoundingClientRect().top + navbar.scrollTop;
    const linkHeight = activeLink.offsetHeight;
    const navbarHeight = navbar.offsetHeight;
    const scrollTopOffset = linkTopOffset + (linkHeight / 2) - (navbarHeight / 2);

    // Scroll the navbar to bring the active link into view, centered vertically if possible
    navbar.scrollTop = scrollTopOffset - navbar.offsetTop;
  }
}