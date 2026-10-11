
export async function displayNailDesigns() {
    const nailDesignList = document.querySelector("#nail-design-list");

    if (!nailDesignList) {
        return;
    }

    try {
        const response = await fetch("data/nail-designs.json");

        if (!response.ok) {
            throw new Error("Failed to load nail designs.");
        }

        const designs = await response.json();

        nailDesignList.innerHTML = designs.map((design) => `
            <article class="service-card">
                <img
                    src="${design.image}"
                    alt="${design.name}"
                    loading="lazy"
                    width="400"
                    height="300"
                >

                <h3>${design.name}</h3>

                <p>${design.description}</p>

                <p class="category">
                    <strong>Category:</strong> ${design.category}
                </p>

                <p class="price">
                    <strong>Price:</strong>
                    ₦${Number(design.price).toLocaleString("en-NG")}
                </p>

                <a
                    href="booking.html?service=${encodeURIComponent(design.name)}"
                    class="booking-button"
                >
                    Book This Design
                </a>
            </article>
        `).join("");

    } catch (error) {
        console.error("Error loading nail designs:", error);

        nailDesignList.innerHTML = `
            <p>Sorry, we could not load the nail designs.
            Please try again later.</p>
        `;
    }
}
