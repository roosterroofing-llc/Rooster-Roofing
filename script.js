document.addEventListener("DOMContentLoaded", function() {
  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --- Priority+ Responsive Navigation ---
  const visibleLinksContainer = document.getElementById('visible-nav-links');
  const overflowContainer = document.getElementById('overflow-nav-container');
  const overflowMenu = document.getElementById('overflow-nav-menu');
  const overflowButton = document.getElementById('overflow-nav-button');
  const masterLinks = document.querySelectorAll('#master-nav-links a');
  const nav = document.querySelector('nav');

  function updateResponsiveNav() {
    if (!nav || !visibleLinksContainer || !overflowContainer) return;

    const availableWidth = nav.offsetWidth;
    visibleLinksContainer.innerHTML = '';
    overflowMenu.innerHTML = '';
    overflowContainer.style.display = 'none';

    masterLinks.forEach(link => {
      visibleLinksContainer.appendChild(link.cloneNode(true));
    });

    let totalWidth = 0;
    const visibleLinks = Array.from(visibleLinksContainer.children);
    visibleLinks.forEach(link => {
      totalWidth += link.offsetWidth;
    });

    if (visibleLinks.length > 1) {
      totalWidth += (visibleLinks.length - 1) * 24;
    }

    if (totalWidth > availableWidth) {
      while (totalWidth > availableWidth && visibleLinksContainer.children.length > 0) {
        const lastLink = visibleLinksContainer.lastElementChild;
        const linkWidth = lastLink.offsetWidth + 24;
        const overflowLink = lastLink.cloneNode(true);
        overflowLink.className =
          'block py-2 px-4 text-sm hover:text-primary-foreground hover:font-bold hover:bg-red-700 hover:text-lg transition-colors';
        overflowMenu.insertBefore(overflowLink, overflowMenu.firstChild);
        visibleLinksContainer.removeChild(lastLink);
        totalWidth -= linkWidth;
      }
      overflowContainer.style.display = 'block';
    }
  }

  if (overflowButton) {
    overflowButton.addEventListener('click', () =>
      overflowMenu.classList.toggle('hidden')
    );
    overflowMenu.addEventListener('mouseleave', () =>
      overflowMenu.classList.add('hidden')
    );
  }

  updateResponsiveNav();
  window.addEventListener('resize', updateResponsiveNav);

  // --- Location Detection and Selection ---
  const locationWidget = document.getElementById('location-widget');
  const locationDisplay = document.getElementById('location-display');
  const locationMenu = document.getElementById('location-menu');
  const locationList = document.getElementById('location-list');
  const locationArrow = document.getElementById('location-arrow');
  const inAreaMessage = document.getElementById('in-area-message');
  const outOfAreaMessage = document.getElementById('out-of-area-message');

  const serviceAreaPages = {
    "Manatee County, FL": "/manatee-county/",
    "Sarasota County, FL": "/sarasota-county/",
    "Bradenton Beach, FL": "/bradenton-beach/",
    "Siesta Key, FL": "/siesta-key/",
    "Holmes Beach, FL": "/holmes-beach/",
    "Lakewood Ranch, FL": "/lakewood-ranch/",
    "Anna Maria Island, FL": "/anna-maria-island/",
    "Tampa, FL": "/tampa/",
    "St. Petersburg, FL": "/st-petersburg/",
    "Port Charlotte, FL": "/port-charlotte/"
  };

  const serviceCounties = ["Manatee County", "Sarasota County"];
  const pathParts = window.location.pathname.split('/').filter(part => part !== '');
  const currentPage = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'index.html';


  function populateLocationMenu() {
    if (!locationList) return;
    locationList.innerHTML = '';
    for (const area in serviceAreaPages) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = serviceAreaPages[area];
      a.textContent = area;
      a.className = "block px-4 py-2 text-sm text-foreground hover:bg-muted";
      li.appendChild(a);
      locationList.appendChild(li);
    }
  }

  function showInAreaMessage() {
    if (inAreaMessage) inAreaMessage.textContent = "(We serve your area!)";
  }

  function showOutOfAreaMessage() {
    if (outOfAreaMessage) outOfAreaMessage.textContent = "(Out of Service Area)";
  }

  async function getLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const city = data.city;
      const state = data.region_code;
      const county = data.county;

      locationDisplay.textContent = `${city || "Your Location"}, ${state || ""}`;

      const inServiceCounty = serviceCounties.some(c => county && county.includes(c));
      const inServiceCity = Object.keys(serviceAreaPages).some(area => city && city.includes(area));

      if (inServiceCounty || inServiceCity) {
        showInAreaMessage();
      } else {
        showOutOfAreaMessage();
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      locationDisplay.textContent = "Select Location";
    } finally {
      if (locationWidget) locationWidget.classList.remove('hidden');
    }
  }

  async function handleLocationLogic() {
    const isLocationPage = Object.values(serviceAreaPages).includes(window.location.pathname);

    if (currentPage === 'index.html' || currentPage === '') {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedCity = data.city;
        const detectedState = data.region_code;
        const detectedCounty = data.county;

        let matchedPage = null;
        for (const area in serviceAreaPages) {
          if (detectedCity && detectedCity.includes(area)) {
            matchedPage = serviceAreaPages[area];
            break;
          }
        }

        if (matchedPage) {
          window.location.href = matchedPage;
        } else {
          locationDisplay.textContent = `${detectedCity || "Select Location"}, ${detectedState || ""}`;
          const inServiceCounty = serviceCounties.some(c => detectedCounty && detectedCounty.includes(c));
          if (inServiceCounty) {
            showInAreaMessage();
          } else {
            showOutOfAreaMessage();
          }
          locationWidget.classList.remove('hidden');
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        locationDisplay.textContent = "Select Location";
        locationWidget.classList.remove('hidden');
      }
    } else if (isLocationPage) {
      // Find the matching area name from the URL
      const matchedArea = Object.entries(serviceAreaPages).find(([area, url]) => {
        return window.location.pathname.includes(url);
        });
      
      if (matchedArea) {
        locationDisplay.textContent = matchedArea[0]; // Use the full service area name
        } else {
        locationDisplay.textContent = document.title; // Fallback if not matched
      }
      
      showInAreaMessage();
      locationWidget.classList.remove('hidden');
      } else {
      getLocation();
      }
    }

  if (locationWidget) {
    populateLocationMenu();
    handleLocationLogic();

    if (locationArrow) {
      locationArrow.addEventListener('click', (event) => {
        event.stopPropagation();
        if (locationMenu) {
          locationMenu.classList.toggle('hidden');
        }
      });
    }

    document.addEventListener('click', function(event) {
      if (locationWidget && !locationWidget.contains(event.target)) {
        if (locationMenu) {
          locationMenu.classList.add('hidden');
        }
      }
    });
  }

  // --- Interactive Map Logic ---
  const mapLinks = document.querySelectorAll('.map-link');
  const serviceAreaMap = document.getElementById('service-area-map');

  if (mapLinks && serviceAreaMap) {
    function isSafeMapSrc(src) {
      try {
        const url = new URL(src, window.location.origin);
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
      link.addEventListener('click', function(event) {
        event.preventDefault();

        // Highlight active link
        mapLinks.forEach(l => l.classList.remove('text-red-700', 'font-bold'));
        this.classList.add('text-red-700', 'font-bold');

        const newSrc = this.getAttribute('data-src');
        if (newSrc && isSafeMapSrc(newSrc)) {
          serviceAreaMap.style.opacity = 0;
          setTimeout(() => {
            serviceAreaMap.src = newSrc;
          }, 300);
        } else {
          console.warn("Blocked unsafe src value for serviceAreaMap:", newSrc);
        }
      });
    });

    // Fade back in when iframe finishes loading
    serviceAreaMap.addEventListener('load', () => {
      serviceAreaMap.style.transition = "opacity 0.5s ease-in-out";
      serviceAreaMap.style.opacity = 1;
    });
  }

  // --- Gallery Auto-Slide ---
  const sliders = document.querySelectorAll('.c');
  const slideInterval = 5000;

  sliders.forEach(slider => {
    let intervalId;
    const sliderName = slider.querySelector('input[type="radio"]').name;
    const radioButtons = slider.querySelectorAll('input[name="' + sliderName + '"]');
    const totalSlides = radioButtons.length;
    let currentSlide = 0;

    const startAutoSlide = () => {
      intervalId = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        radioButtons[currentSlide].checked = true;
      }, slideInterval);
    };

    const stopAutoSlide = () => {
      clearInterval(intervalId);
    };

    startAutoSlide();
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    radioButtons.forEach(radio => {
      radio.addEventListener('click', () => {
        stopAutoSlide();
        currentSlide = Array.from(radioButtons).indexOf(radio);
        startAutoSlide();
      });
    });
  });
});

// --- Function to load external scripts ---
function loadScript(src, isAsync = true) {
  let script = document.createElement('script');
  script.src = src;
  script.async = isAsync;
  document.body.appendChild(script);
}
loadScript("https://static.elfsight.com/platform/platform.js");
