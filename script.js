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
    const masterLinks = document.querySelectorAll('#master-nav-links a');
    const nav = document.querySelector('nav.hidden.lg\\:flex');

    function updateResponsiveNav() {
        if (!nav || !visibleLinksContainer || !overflowContainer) return;

        // Get the total available width for the nav links
        const availableWidth = nav.offsetWidth;

        // Reset the state
        visibleLinksContainer.innerHTML = '';
        overflowMenu.innerHTML = '';
        overflowContainer.style.display = 'none';

        // Add all links to the visible container to measure them
        masterLinks.forEach(link => {
            visibleLinksContainer.appendChild(link.cloneNode(true));
        });

        // Measure total width of all links
        let totalWidth = 0;
        const visibleLinks = Array.from(visibleLinksContainer.children);
        visibleLinks.forEach(link => {
            totalWidth += link.offsetWidth;
        });
        
        // Add spacing between links to the total width
        if (visibleLinks.length > 1) {
            totalWidth += (visibleLinks.length - 1) * 24; // 24px is from space-x-6
        }

        // Check if overflow is needed
        if (totalWidth > availableWidth) {
            // Move links to the overflow menu one by one until they fit
            while (totalWidth > availableWidth && visibleLinksContainer.children.length > 0) {
                const lastLink = visibleLinksContainer.lastElementChild;
                const linkWidth = lastLink.offsetWidth + 24; // Add spacing
                
                // Prepare the link for the red dropdown menu
                const overflowLink = lastLink.cloneNode(true);
                overflowLink.className = 'block px-4 py-2 text-sm text-red-600 hover:bg-muted hover:text-red-700';

                overflowMenu.insertBefore(overflowLink, overflowMenu.firstChild);
                visibleLinksContainer.removeChild(lastLink);
                totalWidth -= linkWidth;
            }
            overflowContainer.style.display = 'block';
        }
    }

    // --- Hover logic for the "More" dropdown ---
    if (overflowContainer) {
        overflowContainer.addEventListener('mouseenter', () => overflowMenu.classList.remove('hidden'));
        overflowContainer.addEventListener('mouseleave', () => overflowMenu.classList.add('hidden'));
    }

    // Initial setup and resize handling
    updateResponsiveNav();
    window.addEventListener('resize', updateResponsiveNav);


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
    // Check if the widget div exists on the page before trying to trigger it
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
