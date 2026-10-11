/* ==========================================
   TITI NAIL STUDIO
   BOOKING PAGE JAVASCRIPT
   ========================================== */

const SERVICES_URL = "data/services.json";
const DESIGNS_URL = "data/nail-designs.json";
const STORAGE_KEY = "titi-nail-studio-booking-draft";

// Catalog elements
const catalogList = document.querySelector("#booking-catalog-list");
const searchInput = document.querySelector("#catalog-search");
const filterSelect = document.querySelector("#catalog-filter");
const catalogStatus = document.querySelector("#catalog-status");

// Booking form elements
const bookingForm = document.querySelector("#booking-form");
const serviceSelect = document.querySelector("#service-select");
const appointmentDate = document.querySelector("#appointment-date");
const appointmentTime = document.querySelector("#appointment-time");

// Dialog elements
const serviceDialog = document.querySelector("#service-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDetails = document.querySelector("#dialog-details");
const dialogClose = document.querySelector("#dialog-close");
const dialogBook = document.querySelector("#dialog-book");

let catalogItems = [];
let selectedDialogItem = null;


/* ==========================================
   1. FETCH JSON DATA
   ========================================== */

async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`);
    }

    return response.json();
}


/* ==========================================
   2. HELPER FUNCTIONS
   ========================================== */

function formatPrice(price) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(Number(price));
}

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

function getName(item) {
    return item.name || item.title || "Nail Studio Item";
}

function getCategory(item) {
    return item.category ||
        (item.itemType === "design" ? "Nail Design" : "Service");
}

function findCatalogItem(id) {
    return catalogItems.find(
        item => String(item.id) === String(id)
    );
}


/* ==========================================
   3. DISPLAY SERVICES AND NAIL DESIGNS
   ========================================== */

function renderCatalog(items) {
    if (!catalogList) return;

    if (items.length === 0) {
        catalogList.innerHTML =
            "<p>No matching services or nail designs found.</p>";

        if (catalogStatus) {
            catalogStatus.textContent = "No matching items found.";
        }

        return;
    }

    catalogList.innerHTML = items.map(item => {
        const name = escapeHTML(getName(item));

        const description = escapeHTML(
            item.description || item.details || "Contact us for details."
        );

        const category = escapeHTML(getCategory(item));

        const price = item.price !== undefined
            ? `<p class="catalog-price">${formatPrice(item.price)}</p>`
            : "";

        const image = item.image
            ? `<img
                    src="${escapeHTML(item.image)}"
                    alt="${name}"
                    loading="lazy"
                    width="400"
                    height="300"
                >`
            : "";

        return `
            <article class="booking-card">
                ${image}

                <div class="booking-card-content">
                    <p class="catalog-category">${category}</p>

                    <h3>${name}</h3>

                    <p>${description}</p>

                    ${price}

                    <button
                        type="button"
                        class="view-details"
                        data-item-id="${escapeHTML(item.id)}"
                    >
                        View Details
                    </button>
                </div>
            </article>
        `;
    }).join("");

    if (catalogStatus) {
        catalogStatus.textContent = `${items.length} item(s) found.`;
    }
}


/* ==========================================
   4. SEARCH AND FILTER
   ========================================== */

function filterCatalog() {
    const searchTerm =
        searchInput?.value.trim().toLowerCase() || "";

    const selectedCategory =
        filterSelect?.value || "all";

    const filteredItems = catalogItems.filter(item => {
        const searchableText = [
            getName(item),
            item.description || "",
            getCategory(item)
        ].join(" ").toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        // Match the filter with the item's type:
        // service or design.
        const matchesCategory =
            selectedCategory === "all" ||
            item.itemType === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderCatalog(filteredItems);
}


/* ==========================================
   5. POPULATE SERVICE DROPDOWN
   ========================================== */

function populateServiceOptions() {
    if (!serviceSelect) return;

    serviceSelect.innerHTML = `
        <option value="">Choose a service or design</option>

        ${catalogItems.map(item => `
            <option value="${escapeHTML(item.id)}">
                ${escapeHTML(getName(item))}
                ${item.price !== undefined
            ? ` — ${formatPrice(item.price)}`
            : ""}
            </option>
        `).join("")}
    `;
}


/* ==========================================
   6. SELECT SERVICE FROM URL
   ========================================== */

function selectServiceFromURL() {
    if (!serviceSelect) return;

    const params = new URLSearchParams(window.location.search);
    const selectedService = params.get("service");

    if (!selectedService) return;

    const matchingItem = catalogItems.find(item =>
        getName(item).toLowerCase() === selectedService.toLowerCase()
    );

    if (matchingItem) {
        serviceSelect.value = matchingItem.id;
        saveBookingDraft();
    }
}


/* ==========================================
   7. SERVICE DETAILS DIALOG
   ========================================== */

function openServiceDialog(item) {
    if (!serviceDialog || !dialogTitle || !dialogDetails) return;

    selectedDialogItem = item;

    dialogTitle.textContent = getName(item);

    dialogDetails.innerHTML = `
        <p>
            ${escapeHTML(
        item.description || item.details || "Contact us for details."
    )}
        </p>

        <p>
            <strong>Category:</strong>
            ${escapeHTML(getCategory(item))}
        </p>

        ${item.price !== undefined
            ? `<p><strong>Price:</strong> ${formatPrice(item.price)}</p>`
            : ""}

        ${item.image
            ? `<img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(getName(item))}"
                    loading="lazy"
                >`
            : ""}
    `;

    if (!serviceDialog.open) {
        serviceDialog.showModal();
    }
}


/* ==========================================
   8. SAVE AND RESTORE BOOKING DRAFT
   Only service, date, and time are saved
   ========================================== */

function saveBookingDraft() {
    const draft = {
        service: serviceSelect?.value || "",
        appointmentDate: appointmentDate?.value || "",
        appointmentTime: appointmentTime?.value || ""
    };

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(draft)
        );
    } catch (error) {
        console.error("Could not save booking draft:", error);
    }
}


function restoreBookingDraft() {
    try {
        const savedDraft = localStorage.getItem(STORAGE_KEY);

        if (!savedDraft) return;

        const draft = JSON.parse(savedDraft);

        if (serviceSelect && draft.service) {
            const optionExists = Array.from(serviceSelect.options)
                .some(option => option.value === draft.service);

            if (optionExists) {
                serviceSelect.value = draft.service;
            }
        }

        if (appointmentDate && draft.appointmentDate) {
            // Do not restore a date earlier than today.
            if (draft.appointmentDate >= appointmentDate.min) {
                appointmentDate.value = draft.appointmentDate;
            }
        }

        if (appointmentTime && draft.appointmentTime) {
            appointmentTime.value = draft.appointmentTime;
        }

    } catch (error) {
        console.error("Could not restore booking draft:", error);
    }
}


/* ==========================================
   9. EVENT LISTENERS
   ========================================== */

// Search and filter
searchInput?.addEventListener("input", filterCatalog);
filterSelect?.addEventListener("change", filterCatalog);


// Open service details
catalogList?.addEventListener("click", event => {
    const button = event.target.closest(".view-details");

    if (!button) return;

    const item = findCatalogItem(button.dataset.itemId);

    if (item) {
        openServiceDialog(item);
    }
});


// Close service details dialog
dialogClose?.addEventListener("click", () => {
    serviceDialog?.close();
});


// Select a service from the dialog
dialogBook?.addEventListener("click", () => {
    if (!selectedDialogItem || !serviceSelect) return;

    serviceSelect.value = selectedDialogItem.id;

    saveBookingDraft();

    serviceDialog?.close();

    bookingForm?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    serviceSelect.focus();
});


// Save changes to the booking draft
serviceSelect?.addEventListener("change", saveBookingDraft);
appointmentDate?.addEventListener("change", saveBookingDraft);
appointmentTime?.addEventListener("change", saveBookingDraft);


/* ==========================================
   10. MINIMUM APPOINTMENT DATE
   ========================================== */

if (appointmentDate) {
    const today = new Date();

    appointmentDate.min = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
}


/* ==========================================
   11. LOAD THE CATALOG
   ========================================== */

async function loadCatalog() {
    try {
        if (catalogStatus) {
            catalogStatus.textContent =
                "Loading services and nail designs...";
        }

        const [services, designs] = await Promise.all([
            fetchJSON(SERVICES_URL),
            fetchJSON(DESIGNS_URL)
        ]);

        const serviceItems = services.map((item, index) => ({
            ...item,
            id: `service-${item.id ?? index}`,
            itemType: "service",
            category: item.category || "Service"
        }));

        const designItems = designs.map((item, index) => ({
            ...item,
            id: `design-${item.id ?? index}`,
            itemType: "design",
            category: item.category || "Nail Design"
        }));

        catalogItems = [...serviceItems, ...designItems];

        // Display all catalog items.
        renderCatalog(catalogItems);

        // Fill the booking dropdown.
        populateServiceOptions();

        // Restore the saved booking information.
        restoreBookingDraft();

        // A service passed in the URL takes priority.
        selectServiceFromURL();

    } catch (error) {
        console.error("Unable to load the catalog:", error);

        if (catalogStatus) {
            catalogStatus.textContent =
                "Unable to load the catalog. Check your JSON files and try again.";
        }
    }
}


// Start loading the catalog.
loadCatalog();