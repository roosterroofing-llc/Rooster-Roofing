document.addEventListener("DOMContentLoaded", function () {
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
    const nav = document.querySelector('nav.hidden.lg\\:flex');

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
                overflowLink.className = 'block py-2 px-4 text-sm hover:text-primary-foreground hover:font-bold hover:bg-red-700 hover:text-lg transition-colors';

                overflowMenu.insertBefore(overflowLink, overflowMenu.firstChild);
                visibleLinksContainer.removeChild(lastLink);
                totalWidth -= linkWidth;
            }
            overflowContainer.style.display = 'block';
        }
    }

    if (overflowButton) {
        overflowButton.addEventListener('click', () => overflowMenu.classList.toggle('hidden'));
        overflowMenu.addEventListener('mouseleave', () => overflowMenu.classList.add('hidden'));
    }

    updateResponsiveNav();
    window.addEventListener('resize', updateResponsiveNav);
    
    // --- Location Detection and Selection ---
    const locationWidget = document.getElementById('location-widget');
    const locationDisplay = document.getElementById('location-display');
    const locationSelect = document.getElementById('location-select');
    const outOfAreaMessage = document.getElementById('out-of-area-message');

    const serviceAreaPages = {
        "Tampa": "tampa.html",
        "St. Petersburg": "st-petersburg.html",
        "Bradenton": "bradenton.html",
        "Sarasota": "sarasota.html",
        "Venice": "venice.html",
        "Port Charlotte": "port-charlotte.html"
    };
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    function populateLocationSelector() {
        if (!locationSelect) return;
        locationSelect.innerHTML = `<option value="">Change Location</option>`;
        for (const area in serviceAreaPages) {
            const option = document.createElement('option');
            option.value = serviceAreaPages[area];
            option.textContent = area;
            locationSelect.appendChild(option);
        }
    }
    
    function showOutOfAreaMessage() {
        if(outOfAreaMessage) {
            outOfAreaMessage.textContent = "(Out of Service Area)";
        }
    }

    async function getLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            const detectedCity = data.city;
            
            locationDisplay.textContent = detectedCity || "Your Location";
            
            const inServiceArea = Object.keys(serviceAreaPages).some(area => detectedCity && detectedCity.includes(area));

            if (!inServiceArea) {
                showOutOfAreaMessage();
            }

        } catch (error) {
            console.error("Error fetching location:", error);
            locationDisplay.textContent = "Select Location";
        } finally {
            if (locationWidget) {
                locationWidget.classList.remove('hidden');
            }
        }
    }

    async function handleLocationLogic() {
        const isLocationPage = Object.values(serviceAreaPages).includes(currentPage);
        
        if (currentPage === 'index.html' || currentPage === '') {
            // On the homepage, detect and redirect if possible
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const detectedCity = data.city;
                
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
                    locationDisplay.textContent = detectedCity || "Your Location";
                    showOutOfAreaMessage();
                    locationWidget.classList.remove('hidden');
                }
            } catch (error) {
                console.error("Error fetching location:", error);
                locationDisplay.textContent = "Select Location";
                locationWidget.classList.remove('hidden');
            }
        } else if (isLocationPage) {
            // On a location page, display the city from the title
            const pageTitle = document.title.split(' ')[0].replace('-', ' ');
            locationDisplay.textContent = pageTitle;
            locationWidget.classList.remove('hidden');
        } else {
            // On any other page (like About, Contact), just detect and display location
            getLocation();
        }
    }


    if (locationWidget) {
        populateLocationSelector();
        handleLocationLogic();

        locationWidget.addEventListener('click', (event) => {
            if (event.target.tagName !== 'SELECT') {
                locationSelect.classList.toggle('hidden');
            }
        });

        locationSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                window.location.href = e.target.value;
            }
        });

        document.addEventListener('click', function(event) {
            if (!locationWidget.contains(event.target)) {
                locationSelect.classList.add('hidden');
            }
        });
    }
    
    // --- Gorilla Roof Leads Widget ---
    function triggerWidget() {
        const button = document.querySelector(".es-roof-calc-widget button");
        if (button) {
            button.click();
        } else {
            console.warn("Roof quote button not found, retrying...");
            setTimeout(triggerWidget, 500);
        }
    }
    if (document.querySelector(".es-roof-calc-widget")) {
        setTimeout(triggerWidget, 1000);
    }
});

// --- Function to load external scripts ---
function loadScript(src, isAsync = true) {
    let script = document.createElement('script');
    script.src = src;
    script.async = isAsync;
    document.body.appendChild(script);
}

// Load external widget scripts
loadScript("https://widget.gorillaroofleads.com/index.js");
loadScript("https://static.elfsight.com/platform/platform.js");
