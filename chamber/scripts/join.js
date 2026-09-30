// ------------------------------
// HAMBURGER MENU
// ------------------------------

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

// Current year
const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Last modified date
const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// ==========================================
// FORM TIMESTAMP
// ==========================================

// Find the hidden timestamp input
const timestamp = document.querySelector("#timestamp");

// Put the current date and time into the hidden input
if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// ==========================================
// MEMBERSHIP MODALS
// ==========================================

// Select all "Learn More" links
const modalLinks = document.querySelectorAll(".modal-link");

// Add a click event to every membership link
modalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        // Stop the link from jumping to #np-modal, etc.
        event.preventDefault();

        // Get the modal ID from data-modal
        const modalId = link.dataset.modal;

        // Find that modal
        const modal = document.querySelector(`#${modalId}`);

        // Open the modal
        if (modal) {
            modal.showModal();
        }

    });

});


// ==========================================
// CLOSE BUTTONS
// ==========================================

// Select all modal close buttons
const closeButtons = document.querySelectorAll(".close-modal");

// Add a click event to every close button
closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Find the dialog containing this button
        const modal = button.closest("dialog");

        // Close the dialog
        if (modal) {
            modal.close();
        }

    });

});


// ==========================================
// CLOSE MODAL BY CLICKING OUTSIDE
// ==========================================

const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {

    dialog.addEventListener("click", (event) => {

        // Get the size and position of the dialog
        const rectangle = dialog.getBoundingClientRect();

        // Check whether the click happened inside the dialog
        const clickedInside =
            event.clientX >= rectangle.left &&
            event.clientX <= rectangle.right &&
            event.clientY >= rectangle.top &&
            event.clientY <= rectangle.bottom;

        // If the click was outside, close the modal
        if (!clickedInside) {
            dialog.close();
        }

    });

});

