
import { displayNailDesigns } from "./nail-designs.js";

// FEATURED SERVICES
const featuredServicesList = document.querySelector("#featured-services-list");

async function displayFeaturedServices() {
    if (!featuredServicesList) {
        return;
    }

    try {
        const response = await fetch("data/services.json");

        if (!response.ok) {
            throw new Error("Failed to load services.");
        }

        const services = await response.json();

        // Select four featured services.
        const featuredServices = [
            services[1],
            services[2],
            services[9],
            services[17]
        ].filter(Boolean);

        featuredServicesList.innerHTML = featuredServices.map((service) => `
            <article class="service-card">
                <img
                    src="${service.image}"
                    alt="${service.name}"
                    loading="lazy"
                    width="400"
                    height="300"
                >

                <h3>${service.name}</h3>

                <p>${service.description}</p>

                <p class="price">
                    <strong>Price:</strong>
                    ₦${Number(service.price).toLocaleString("en-NG")}
                </p>

                <a
                    href="booking.html?service=${encodeURIComponent(service.name)}"
                    class="booking-button"
                >
                    Book This Service
                </a>
            </article>
        `).join("");

    } catch (error) {
        console.error("Error loading featured services:", error);

        featuredServicesList.innerHTML = `
            <p>Sorry, we could not load the featured services.
            Please try again later.</p>
        `;
    }
}

// DISPLAY BOTH SECTIONS
displayFeaturedServices();
displayNailDesigns();
