// --- Mobile Menu Toggle ---
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// --- Smooth Scroll for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Interactive Map Logic ---
const mapLinks = document.querySelectorAll('.map-link');
const serviceAreaMap = document.getElementById('service-area-map');

if (mapLinks && serviceAreaMap) {
  // Helper function to validate URL (allow Google Maps embeds too)
  function isSafeMapSrc(src) {
    try {
      const url = new URL(src, window.location.origin);
      // Allow relative URLs, same origin, or trusted Google Maps embed
      if (
        url.origin === window.location.origin ||
        url.hostname.includes("google.com")
      ) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  mapLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // remove highlight from previously active link
      mapLinks.forEach(l => l.classList.remove('text-red-700', 'font-bold'));

      // add highlight to clicked link
      this.classList.add('text-red-700', 'font-bold');

      // update iframe map with fade effect
      const newSrc = this.getAttribute('data-src');
      if (newSrc && isSafeMapSrc(newSrc)) {
        serviceAreaMap.classList.add('opacity-0'); // fade out
        setTimeout(() => {
          serviceAreaMap.src = newSrc;
          serviceAreaMap.classList.remove('opacity-0'); // fade back in
        }, 300);
      } else {
        console.warn("Blocked unsafe src value for serviceAreaMap:", newSrc);
      }
    });
  });
}
