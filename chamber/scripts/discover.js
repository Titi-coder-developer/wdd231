import discoverItems from "../data/discover.mjs";


// ==========================================
// HAMBURGER MENU
// ==========================================

const menuButton = document.querySelector("#menu-button");
const navBar = document.querySelector(".nav-bar");

if (menuButton && navBar) {
    menuButton.addEventListener("click", () => {
        navBar.classList.toggle("show");
    });
}


// ==========================================
// FOOTER INFORMATION
// ==========================================

const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


const discoverGrid = document.querySelector("#discover-grid");

// Create the eight discover cards
discoverItems.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = item.address;

    const description = document.createElement("p");
    description.textContent = item.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    discoverGrid.appendChild(card);
});


// Last visit message
const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - Number(lastVisit);
    const daysDifference = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24)
    );

    if (daysDifference < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent =
            `You last visited ${daysDifference} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);