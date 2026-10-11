// ==========================================
// TITI NAIL STUDIO
// APPOINTMENT SUBMISSION DETAILS
// ==========================================


// 1. GET THE HTML ELEMENTS

const formMessage = document.querySelector("#form-message");
const appointmentInfo = document.querySelector("#appointment-info");


// 2. GET THE SUBMITTED FORM DETAILS FROM THE URL

const params = new URLSearchParams(window.location.search);

const customerName = params.get("customerName");
const customerEmail = params.get("customerEmail");
const customerPhone = params.get("customerPhone");
const service = params.get("service");
const appointmentDate = params.get("appointmentDate");
const appointmentTime = params.get("appointmentTime");
const notes = params.get("notes");


// 3. FORMAT THE APPOINTMENT DATE

function formatDate(dateString) {
    if (!dateString) {
        return "Not provided";
    }

    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    if (Number.isNaN(date.getTime())) {
        return "Not provided";
    }

    return new Intl.DateTimeFormat("en-NG", {
        dateStyle: "long"
    }).format(date);
}


// 4. FORMAT THE APPOINTMENT TIME

function formatTime(timeString) {
    if (!timeString) {
        return "Not provided";
    }

    const [hours, minutes] = timeString.split(":").map(Number);

    if (
        !Number.isInteger(hours) ||
        !Number.isInteger(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return "Not provided";
    }

    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return new Intl.DateTimeFormat("en-NG", {
        hour: "numeric",
        minute: "2-digit"
    }).format(date);
}


// 5. DISPLAY THE SUBMITTED APPOINTMENT DETAILS

if (formMessage && appointmentInfo) {

    if (
        customerName?.trim() &&
        customerEmail?.trim() &&
        customerPhone?.trim() &&
        service?.trim() &&
        appointmentDate?.trim() &&
        appointmentTime?.trim()
    ) {

        formMessage.textContent =
            "Your appointment request details have been submitted successfully.";

        // Store the appointment details in an array.
        const details = [
            ["Full Name", customerName],
            ["Email Address", customerEmail],
            ["Phone Number", customerPhone],
            ["Selected Service", service],
            ["Appointment Date", formatDate(appointmentDate)],
            ["Appointment Time", formatTime(appointmentTime)],
            ["Additional Notes", notes?.trim() || "None"]
        ];

        // Create a definition list.
        const detailsList = document.createElement("dl");

        details.forEach(([label, value]) => {
            const term = document.createElement("dt");
            const description = document.createElement("dd");

            term.textContent = label;
            description.textContent = value;

            detailsList.append(term, description);
        });

        // Display the details on the page.
        appointmentInfo.replaceChildren(detailsList);

    } else {

        formMessage.textContent =
            "No complete appointment details were found. Please fill in the booking form.";

        const link = document.createElement("a");

        link.href = "booking.html";
        link.textContent = "Return to the booking form";

        appointmentInfo.replaceChildren(link);
    }
}