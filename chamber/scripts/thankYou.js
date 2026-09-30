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


// ==========================================
// GET FORM DATA
// ==========================================

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");


// ==========================================
// DISPLAY APPLICATION INFORMATION
// ==========================================

const applicationInfo = document.querySelector("#application-info");

if (applicationInfo) {

    applicationInfo.innerHTML = `
        <p><strong>First Name:</strong> ${firstName || ""}</p>
        <p><strong>Last Name:</strong> ${lastName || ""}</p>
        <p><strong>Email:</strong> ${email || ""}</p>
        <p><strong>Mobile Phone:</strong> ${phone || ""}</p>
        <p><strong>Business / Organization:</strong> ${organization || ""}</p>
        <p><strong>Application Submitted:</strong> ${timestamp || ""}</p>
    `;
}