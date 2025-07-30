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


// JavaScript to handle form submission via Fetch API
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitButton = contactForm.querySelector('button[type="submit"]');

            formStatus.innerHTML = '<p class="text-yellow-600">Sending...</p>';
            submitButton.disabled = true;

            fetch('https://formsubmit.co/ajax/sales@roosterroofingnow.com', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formStatus.innerHTML = '<p class="text-green-600">Thank you! Your message has been sent successfully. We will get back to you shortly.</p>';
                        contactForm.reset();
                    } else {
                        formStatus.innerHTML = '<p class="text-red-600">Oops! Something went wrong. Please try again or contact us directly by phone or email.</p>';
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    formStatus.innerHTML = '<p class="text-red-600">Oops! There was a network error. Please check your connection and try again.</p>';
                })
                .finally(() => {
                    submitButton.disabled = false;
                });
        });
    }
});


// Load external widget scripts
loadScript("https://widget.gorillaroofleads.com/index.js");
loadScript("https://static.elfsight.com/platform/platform.js");
