document.addEventListener("DOMContentLoaded", function () {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
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
