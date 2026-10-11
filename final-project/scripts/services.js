
const servicesList = document.querySelector("#services-list");

// Get the services from the JSON file.
async function getServices() {
    try {
        const response = await fetch("data/services.json");

        if (!response.ok) {
            throw new Error("Could not load the services data.");
        }

        const services = await response.json();

        displayServices(services);
    } catch (error) {
        console.error("Error loading services:", error);

        servicesList.innerHTML =
            "<p>Sorry, we could not load the services. Please try again later.</p>";
    }
}

// Display the services on the page.
function displayServices(services) {
    servicesList.innerHTML = "";

    services.forEach((service) => {
        const serviceCard = document.createElement("article");
        serviceCard.classList.add("service-card");

        serviceCard.innerHTML = `
            <img
                src="${service.image}"
                alt="${service.name}"
                loading="lazy"
                width="400"
                height="300"
            >

            <div class="service-card-content">
                <p class="category">${service.category}</p>

                <h3>${service.name}</h3>

                <p>${service.description}</p>

                <p class="price">
                    ₦${Number(service.price).toLocaleString("en-NG")}
                </p>

                <a
                    class="button"
                    href="booking.html?service=${encodeURIComponent(service.name)}"
                >
                    Book This Service
                </a>
            </div>
        `;

        servicesList.appendChild(serviceCard);
    });
}

// Start loading the services.
getServices();
