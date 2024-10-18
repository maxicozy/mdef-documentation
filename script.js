centerActiveLink();

function scrollToElement(targetElement, duration) { // duration in milliseconds
  const targetPosition = targetElement.getBoundingClientRect().top;
  const startPosition = window.scrollY;
  const distance = targetPosition - 0; // Adjust if you want some offset
  let startTime = null;

  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    return c * t / d + b;
  }

  requestAnimationFrame(animation);
}

function centerActiveLink() {
  const navbar = document.querySelector('.navbar-inner');
  const links = navbar.querySelectorAll('a');
  const activeLink = Array.from(links).find(link => link.classList.contains('active'));

  if (!activeLink) return; // Exit if no active link

  // Get the Y coordinates of the active link
  const activeLinkRect = activeLink.getBoundingClientRect();
  const activeLinkY = activeLinkRect.top + window.scrollY;

  // Calculate the center of the active link
  const activeLinkCenterY = activeLinkY + (activeLinkRect.height / 2);

  // Get the Y coordinates of the top of the entire navbar-inner element
  const navbarRect = navbar.getBoundingClientRect();
  const navbarTopY = navbarRect.top + window.scrollY;

  // Calculate the difference between the top of the navbar-inner and the center of the active link
  const difference = activeLinkCenterY - navbarTopY;

  // Get half of the viewport height
  const halfViewportHeight = window.innerHeight / 2;

  // Move the navbar-inner element to a place that's above the center by the calculated difference
  // and adjust by half of the viewport height
  const newTranslateY = -difference + halfViewportHeight;

  // Apply the transformation
  navbar.style.transform = `translateY(${newTranslateY}px)`;
}

// Call the function to center the active link
centerActiveLink();

document.addEventListener('DOMContentLoaded', function() {
  const iframeWrapper = document.querySelector('.iframe-wrapper');
  const iframe = iframeWrapper.querySelector('iframe');

  function adjustIframeHeight() {
    const aspectRatio = 12 / 16; // Aspect ratio: 16:9
    const width = iframeWrapper.offsetWidth;
    const height = width * aspectRatio;
    iframe.style.height = `${height}px`;
  }

  // Adjust iframe height on load and resize
  adjustIframeHeight();
  window.addEventListener('resize', adjustIframeHeight);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      isScrollingToAnchor = true; // Indicate that scrolling to an anchor has started
      scrollToElement(targetElement, 50); // Adjust duration as needed
      setTimeout(() => {
        isScrollingToAnchor = false; // Reset the flag after scrolling
        centerActiveLink(); // Recenter the active link
      }, 50);
      // Ensure this duration matches the scrollToElement duration
    }
  });
});

let isScrollingToAnchor = false; // Step 1: Define a flag

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navbarLinks = document.querySelectorAll('.navbar-inner a[href^="#"]');
  let currentSectionIndex = -1;

  const updateActiveSectionAndLink = () => {

    let newSectionIndex = -1;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        newSectionIndex = index;
        section.classList.add('active'); // Add active class to section
      } else {
        section.classList.remove('active'); // Remove active class from section
      }
    });
    // Update navbar link only if section has changed
    if (currentSectionIndex !== newSectionIndex) {
      currentSectionIndex = newSectionIndex;
      navbarLinks.forEach((link, index) => {
        link.classList.toggle('active', index === newSectionIndex);
      });
    }
  };

  // Throttle scroll event to improve performance
  let isThrottled = false;
  const throttleDuration = 20; // milliseconds
  const throttledScrollHandler = () => {
    if (!isThrottled && !isScrollingToAnchor) { // Step 4: Check the flag
      updateActiveSectionAndLink();
      centerActiveLink(); // Call centerActiveLink here to adjust navbar based on scroll
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, throttleDuration);
    }
  };

  window.addEventListener('scroll', throttledScrollHandler);

  // Re-enable throttled scroll handler and ensure it's correctly implemented
  navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      isScrollingToAnchor = true; // Set the flag when starting to scroll to an anchor
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
  
      // Reset isScrollingToAnchor after scrolling is complete
      // This might require a more sophisticated approach to detect when scrolling is done
      setTimeout(() => {
        isScrollingToAnchor = false;
      }, 1000); // Example timeout, adjust based on actual scrolling duration
    });
  });
});






