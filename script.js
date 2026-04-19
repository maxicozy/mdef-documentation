centerActiveLink();

function scrollToElement(targetElement, duration) { // duration in milliseconds
  const targetPosition = targetElement.offsetTop - (window.innerHeight / 2) + 10; // Offset by half viewport height so section lands at mid-screen, slightly lower
  
  // Use native smooth scroll with behavior
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

function centerActiveLink() {
  // Navbar is now fixed at vertical center, no need to move it
}

function updatePointerPosition() {
  const navbar = document.querySelector('.navbar');
  const activeLink = document.querySelector('.navbar-inner a.active');

  if (!activeLink) return;

  // Get the vertical center position of the active nav link
  const linkRect = activeLink.getBoundingClientRect();
  const linkCenterY = linkRect.top + (linkRect.height / 2);

  // Update the CSS variable on the navbar to move the pointer
  navbar.style.setProperty('--pointer-top', `${linkCenterY}px`);
}

// Initialize pointer position on load
window.addEventListener('load', updatePointerPosition);

// Navbar is now fixed at vertical center, no repositioning needed

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

let isScrollingToAnchor = false; // Step 1: Define a flag

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navbarLinks = document.querySelectorAll('.navbar-inner a[href^="#"]');
  let currentSectionIndex = -1;

  const updateActiveSectionAndLink = () => {
    let closestSectionIndex = -1;
    let closestDistance = Infinity;

    // Calculate the vertical position at the middle of the screen
    const midScreenY = window.scrollY + (window.innerHeight / 2);

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const distanceFromMidpoint = midScreenY - sectionTop; // How far past the section we are at mid-screen

      // Find the section whose top we most recently passed at mid-screen
      // Only consider sections we've already scrolled past (distance >= 0)
      if (distanceFromMidpoint >= 0 && distanceFromMidpoint < closestDistance) {
        closestDistance = distanceFromMidpoint;
        closestSectionIndex = index;
      }
    });

    // Clear all active classes
    sections.forEach(section => section.classList.remove('active'));

    // Set active only on the closest section
    if (closestSectionIndex >= 0) {
      sections[closestSectionIndex].classList.add('active');
    }

    // Update navbar link only if section has changed
    if (currentSectionIndex !== closestSectionIndex) {
      currentSectionIndex = closestSectionIndex;
      navbarLinks.forEach((link, index) => {
        link.classList.toggle('active', index === closestSectionIndex);
      });
    }
  };

  // Throttle scroll event to improve performance
  let isThrottled = false;
  const throttleDuration = 20; // milliseconds
  const throttledScrollHandler = () => {
    if (!isThrottled && !isScrollingToAnchor) { // Step 4: Check the flag
      updateActiveSectionAndLink();
      updatePointerPosition(); // Update pointer position based on active section
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
      const startPosition = window.scrollY;
      const targetPosition = targetSection.offsetTop - (window.innerHeight / 2) + 10;
      const distance = Math.abs(targetPosition - startPosition);
      scrollToElement(targetSection, distance);
  
      // Reset isScrollingToAnchor after scrolling is complete
      setTimeout(() => {
        isScrollingToAnchor = false;
        updatePointerPosition(); // Update pointer after smooth scroll completes
      }, 400); // Native smooth scroll is ~300ms, add buffer
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
    const hoverGifs = document.querySelectorAll('.hover-gif');

  hoverGifs.forEach(img => {
        const gifSrc = img.getAttribute('data-gif');
        const staticSrc = img.getAttribute('src');

    img.addEventListener('mouseover', () => {
            img.setAttribute('src', gifSrc);
      
        });

    img.addEventListener('mouseout', () => {
            img.setAttribute('src', staticSrc);
      
        });
    });
  });