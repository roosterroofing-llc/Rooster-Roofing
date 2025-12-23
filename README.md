<div align="center">
  <img src="https://ik.imagekit.io/roosterroofing/Logo%20Icon.png?updatedAt=1753913620033" alt="Rooster Roofing Logo" width="150"/>
  <h1>Rooster Roofing, LLC</h1>
  <p>
    <strong>Certified Roofing Contractor | Sarasota, FL</strong>
  </p>
  <p>
    Your trusted partner for residential and commercial roofing. We offer full roof replacements, repairs, and emergency roofing services. Licensed and insured for your peace of mind. This repository contains the source code for our official website.
  </p>
</div>

---

## ✨ Features

* **📱 Responsive Design**: A seamless experience on desktops, tablets, and mobile devices.
* **📋 Comprehensive Services**: Dedicated service pages for Residential, Commercial, Repairs, and more.
* **💲 Instant Roof Estimator**: Two versions of our estimator tool, including a fullscreen option.
* **🖼️ Project Gallery**: Before-and-after gallery showcasing our workmanship with carousels.
* **📧 Easy Contact**: Contact page for inquiries and quote requests.
* **⭐ Customer Reviews**: Integrated Google Reviews widget for credibility.
* **✍️ Informative Blog**: A blog with expert roofing tips and maintenance insights.

---

## 🛠️ Technologies & Services

| Technology / Service                                        | Description                                           |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| **HTML5 & CSS3** | The foundation of our web pages and styling.          |
| **JavaScript** | Adds interactivity like mobile menus and widgets.     |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework for rapid UI development. |
| **[SwiperJS](https://swiperjs.com/)** | Used for project gallery carousels.                   |
| **[Roofr](https://roofr.com/)** | Powers our instant roof estimator tool.               |
| **[Elfsight](https://elfsight.com/)** | Embeds Google Reviews widget.                         |
| **[FormSubmit](https://formsubmit.co/)** | Handles contact form submissions.                     |

---

## 🚀 Getting Started

This website is hosted directly from a **Google Cloud Storage bucket**. To deploy updates:

1. **Upload or sync your files** to the bucket:

   ```bash
   gsutil -m rsync -r ./local-folder gs://roosterroofingnow.com

2. **Confirm public access** is enabled with:

Bash

gcloud storage buckets get-iam-policy gs://roosterroofingnow.com

3. **Test your site** by visiting:

https://storage.googleapis.com/roosterroofingnow.com/index.html

4. (Optional) Configure your custom domain roosterroofingnow.com in DNS to point to the bucket and enable HTTPS via Google Cloud Load Balancer.

📁 File Structure
. ├── about/index.html ├── anna-maria-island/index.html ├── areas/index.html ├── blog/index.html ├── bradenton-beach/index.html ├── commercial/index.html ├── contact/index.html ├── estimator/index.html ├── gallery/index.html ├── holmes-beach/index.html ├── lakewood-ranch/index.html ├── manatee-county/index.html ├── port-charlotte/index.html ├── privacypolicy/index.html ├── roof-repairs/index.html ├── residential/index.html ├── sarasota-county/index.html ├── services/index.html ├── services-appointment/index.html ├── siesta-key/index.html ├── st-petersburg/index.html ├── tampa/index.html ├── termsofservice/index.html ├── index.html ├── script.js ├── styles.css ├── sitemap.xml ├── robots.txt └── README.md
