
/* ==========================================
   TITI NAIL STUDIO
   SHARED NAVIGATION AND FOOTER
   ========================================== */


// 1. HAMBURGER MENU

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}


// 2. CURRENT YEAR

const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 3. LAST MODIFIED DATE

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
